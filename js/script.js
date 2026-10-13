// ---------- Theme handling ----------

function getSeasonFromDate(date = new Date()) {
  const month = date.getMonth() + 1; // 1-12

  if (month === 10) return "halloween";
  if (month === 12) return "christmas";
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month === 9 || month === 11) return "fall";
  return "winter";
}

function applyTheme(theme) {
  document.body.className = document.body.className
    .split(" ")
    .filter((c) => !c.startsWith("theme-"))
    .join(" ");
  document.body.classList.add(`theme-${theme}`);
}

function initTheme() {
  const select = document.getElementById("themeSelect");
  const saved = localStorage.getItem("recipeSiteTheme") || "auto";
  select.value = saved;
  applyTheme(saved === "auto" ? getSeasonFromDate() : saved);

  select.addEventListener("change", () => {
    const value = select.value;
    localStorage.setItem("recipeSiteTheme", value);
    applyTheme(value === "auto" ? getSeasonFromDate() : value);
  });
}

// ---------- Recipe grid ----------

const recipeImageSearches = new Map();

function searchCommonsImage(title) {
  if (recipeImageSearches.has(title)) return recipeImageSearches.get(title);

  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `${title} filetype:bitmap`,
    gsrnamespace: "6",
    gsrlimit: "1",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "640",
    format: "json",
    origin: "*"
  });
  const search = fetch(`https://commons.wikimedia.org/w/api.php?${params}`)
    .then((response) => {
      if (!response.ok) throw new Error("Image search failed");
      return response.json();
    })
    .then((data) => {
      const page = Object.values(data.query?.pages || {})[0];
      const image = page?.imageinfo?.[0];
      if (!image?.thumburl || !image.descriptionurl) return null;

      const artistMarkup = image.extmetadata?.Artist?.value || "";
      const artist = new DOMParser()
        .parseFromString(artistMarkup, "text/html")
        .body.textContent.trim();
      const license = image.extmetadata?.LicenseShortName?.value || "";
      return { url: image.thumburl, pageUrl: image.descriptionurl, artist, license };
    })
    .catch(() => null);

  recipeImageSearches.set(title, search);
  return search;
}

function createRecipeImage(recipe) {
  const image = document.createElement("img");
  const title = recipe.title.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  })[character]);
  const hue = [...recipe.title].reduce((total, character) => total + character.charCodeAt(0), 0) % 360;
  const placeholder = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="hsl(${hue} 48% 78%)"/><stop offset="1" stop-color="hsl(${(hue + 45) % 360} 52% 52%)"/></linearGradient></defs><rect width="640" height="360" fill="url(#bg)"/><circle cx="320" cy="145" r="78" fill="none" stroke="white" stroke-opacity=".72" stroke-width="3"/><circle cx="320" cy="145" r="58" fill="white" fill-opacity=".2"/><text x="320" y="265" text-anchor="middle" fill="white" font-family="sans-serif" font-size="25" font-weight="600">${title}</text></svg>`;

  image.className = "recipe-card-image";
  image.alt = recipe.title;
  image.loading = "lazy";
  const placeholderUrl = `data:image/svg+xml,${encodeURIComponent(placeholder)}`;
  image.src = recipe.image || placeholderUrl;

  if (recipe.image) {
    image.addEventListener("error", () => {
      image.src = placeholderUrl;
    }, { once: true });
    return image;
  }

  searchCommonsImage(recipe.imageSearch || recipe.title).then((source) => {
    if (!source || !image.isConnected) return;

    const credit = document.createElement("a");
    credit.className = "recipe-card-image-credit";
    credit.href = source.pageUrl;
    credit.target = "_blank";
    credit.rel = "noopener noreferrer";
    credit.textContent = [source.artist, source.license].filter(Boolean).join(" · ") || "Wikimedia Commons";
    credit.setAttribute("aria-label", `Image credit and license for ${recipe.title}`);
    credit.addEventListener("click", (event) => event.stopPropagation());
    image.parentElement.appendChild(credit);
    image.addEventListener("error", () => {
      credit.remove();
      image.src = placeholderUrl;
    }, { once: true });
    image.src = source.url;
  });

  return image;
}

function createRecipeCard(recipe) {
  const card = document.createElement("article");
  card.className = "recipe-card";
  card.dataset.tags = recipe.tags.join(" ");

  card.innerHTML = `
    <div class="recipe-card-media"></div>
    <div class="recipe-card-body">
      <h3>${recipe.title}</h3>
      <div class="recipe-card-tags">
        ${recipe.tags.map((t) => `<span class="tag-pill">${t}</span>`).join("")}
      </div>
    </div>
  `;
  card.querySelector(".recipe-card-media").appendChild(createRecipeImage(recipe));

  card.addEventListener("click", () => openModal(recipe));
  return card;
}

function renderRecipes(recipes) {
  const grid = document.getElementById("recipeGrid");
  const emptyMessage = document.getElementById("emptyMessage");
  grid.innerHTML = "";

  if (!recipes.length) {
    emptyMessage.hidden = false;
    return;
  }
  emptyMessage.hidden = true;
  recipes.forEach((recipe) => grid.appendChild(createRecipeCard(recipe)));
}

function filterRecipes(filter) {
  if (filter === "all") return RECIPES;
  return RECIPES.filter((recipe) => recipe.tags.includes(filter));
}

function initTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderRecipes(filterRecipes(tab.dataset.filter));
    });
  });
}

// ---------- Modal ----------

function openModal(recipe) {
  document.getElementById("modalTitle").textContent = recipe.title;
  document.getElementById("modalTags").innerHTML = recipe.tags
    .map((t) => `<span class="tag-pill">${t}</span>`)
    .join("");
  document.getElementById("modalIngredients").innerHTML = recipe.ingredients
    .map((i) => `<li>${i}</li>`)
    .join("");
  document.getElementById("modalInstructions").innerHTML = recipe.instructions
    .map((i) => `<li>${i}</li>`)
    .join("");
  document.getElementById("modalOverlay").classList.add("open");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}

function initModal() {
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// ---------- Init ----------

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initTabs();
  initModal();
  renderRecipes(RECIPES);
});
