# Recipes Website

A simple static website for storing and browsing recipes I like to make.

## Features

- Recipes displayed in a responsive grid of cards.
- Tabs to filter recipes by meal type (Breakfast, Lunch, Dinner, Dessert) or season (Spring, Summer, Fall, Winter).
- Background theme changes automatically based on the current month (spring/summer/fall/winter, with Halloween in October and Christmas in December), or can be picked manually from the dropdown in the header.
- Click a recipe card to see full ingredients and instructions in a modal.

## Project structure

```
index.html          Main page
css/styles.css       Styling and seasonal themes
js/recipes-data.js   Recipe data — add new recipes here
js/script.js         Filtering, theming, and modal logic
```

## Adding a recipe

Open [js/recipes-data.js](js/recipes-data.js) and add a new object to the `RECIPES` array:

```js
{
  id: "unique-id",
  title: "Recipe Name",
  emoji: "🍳",
  tags: ["breakfast", "fall"], // meal type + optional season
  ingredients: ["..."],
  instructions: ["..."]
}
```

## Running locally

Just open [index.html](index.html) in a browser, or serve the folder with any static file server.
