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

function createRecipeCard(recipe) {
  const card = document.createElement("article");
  card.className = "recipe-card";
  card.dataset.tags = recipe.tags.join(" ");

  card.innerHTML = `
    <div class="recipe-card-image">${recipe.emoji}</div>
    <div class="recipe-card-body">
      <h3>${recipe.title}</h3>
      <div class="recipe-card-tags">
        ${recipe.tags.map((t) => `<span class="tag-pill">${t}</span>`).join("")}
      </div>
    </div>
  `;

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
