// Sample recipe data — edit or add to this list to grow your recipe box.
// tags: combine a meal type (breakfast/lunch/dinner/dessert) with an optional season
// (spring/summer/fall/winter) so recipes can show up under multiple tabs.
const RECIPES = [
  {
    id: "pumpkin-pancakes",
    title: "Pumpkin Spice Pancakes",
    emoji: "🥞",
    tags: ["breakfast", "fall"],
    ingredients: [
      "1 1/2 cups flour",
      "2 tbsp sugar",
      "2 tsp baking powder",
      "2 tsp pumpkin pie spice",
      "1 1/4 cups milk",
      "1/2 cup pumpkin puree",
      "1 egg",
      "2 tbsp melted butter"
    ],
    instructions: [
      "Whisk together flour, sugar, baking powder, and pumpkin spice.",
      "In another bowl, mix milk, pumpkin puree, egg, and melted butter.",
      "Combine wet and dry ingredients until just mixed.",
      "Cook 1/4 cup portions on a greased griddle until bubbles form, then flip.",
      "Serve warm with maple syrup."
    ]
  },
  {
    id: "summer-berry-salad",
    title: "Summer Berry Salad",
    emoji: "🥗",
    tags: ["lunch", "summer"],
    ingredients: [
      "4 cups mixed greens",
      "1 cup strawberries, sliced",
      "1/2 cup blueberries",
      "1/4 cup feta cheese",
      "1/4 cup candied pecans",
      "Balsamic vinaigrette"
    ],
    instructions: [
      "Toss greens with berries, feta, and pecans.",
      "Drizzle with balsamic vinaigrette just before serving."
    ]
  },
  {
    id: "spring-veggie-pasta",
    title: "Spring Vegetable Pasta",
    emoji: "🍝",
    tags: ["dinner", "spring"],
    ingredients: [
      "12 oz pasta",
      "1 cup asparagus, chopped",
      "1 cup peas",
      "2 cloves garlic, minced",
      "1/4 cup olive oil",
      "Parmesan cheese",
      "Salt and pepper"
    ],
    instructions: [
      "Cook pasta according to package directions, adding asparagus and peas in the last 3 minutes.",
      "Drain, reserving a splash of pasta water.",
      "Saute garlic in olive oil, then toss with pasta and vegetables.",
      "Finish with parmesan, salt, and pepper."
    ]
  },
  {
    id: "winter-beef-stew",
    title: "Hearty Winter Beef Stew",
    emoji: "🍲",
    tags: ["dinner", "winter"],
    ingredients: [
      "2 lb beef stew meat",
      "4 carrots, chopped",
      "3 potatoes, cubed",
      "1 onion, diced",
      "4 cups beef broth",
      "2 tbsp tomato paste",
      "Salt, pepper, and thyme"
    ],
    instructions: [
      "Sear beef in a large pot until browned.",
      "Add onion and cook until softened.",
      "Stir in tomato paste, broth, carrots, and potatoes.",
      "Simmer covered for 1.5-2 hours until beef is tender.",
      "Season to taste before serving."
    ]
  },
  {
    id: "pumpkin-pie",
    title: "Classic Pumpkin Pie",
    emoji: "🥧",
    tags: ["dessert", "fall"],
    ingredients: [
      "1 pie crust",
      "15 oz pumpkin puree",
      "3/4 cup sugar",
      "2 eggs",
      "1 cup evaporated milk",
      "1 tsp cinnamon",
      "1/2 tsp ginger",
      "1/4 tsp cloves"
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Whisk pumpkin, sugar, eggs, milk, and spices together.",
      "Pour into pie crust.",
      "Bake 15 minutes, then reduce to 350°F (175°C) and bake 40-50 minutes until set.",
      "Cool completely before slicing."
    ]
  },
  {
    id: "iced-lemonade",
    title: "Fresh Summer Lemonade",
    emoji: "🍋",
    tags: ["dessert", "summer"],
    ingredients: [
      "1 cup lemon juice",
      "3/4 cup sugar",
      "4 cups cold water",
      "Ice",
      "Lemon slices for garnish"
    ],
    instructions: [
      "Dissolve sugar in lemon juice.",
      "Stir in cold water.",
      "Serve over ice with lemon slices."
    ]
  },
  {
    id: "overnight-oats",
    title: "Overnight Oats",
    emoji: "🥣",
    tags: ["breakfast"],
    ingredients: [
      "1/2 cup rolled oats",
      "1/2 cup milk",
      "1/4 cup yogurt",
      "1 tbsp honey",
      "Toppings: berries, nuts, seeds"
    ],
    instructions: [
      "Combine oats, milk, yogurt, and honey in a jar.",
      "Refrigerate overnight.",
      "Top with berries and nuts before eating."
    ]
  },
  {
    id: "grilled-cheese",
    title: "Classic Grilled Cheese",
    emoji: "🥪",
    tags: ["lunch"],
    ingredients: [
      "2 slices bread",
      "2 slices cheddar cheese",
      "1 tbsp butter"
    ],
    instructions: [
      "Butter one side of each bread slice.",
      "Place cheese between the unbuttered sides.",
      "Grill in a skillet over medium heat until golden on both sides and cheese is melted."
    ]
  }
];
