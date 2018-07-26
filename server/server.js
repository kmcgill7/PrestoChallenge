const express = require("express");
const knex = require("knex")({
  client: "pg",
  connection: {
      "host": "db",
      "schema": "presto",
      "database": "postgres",
      "user": "postgres",
      "password": ""
  }
});

// Constants
const PORT = 8080;

// App
const app = express();
app.get("/", (req, res) => {
  res.send("Hello Presto!\n");
});

const renderItem = (adjacencyLists, item) => {
  const renderedItem = {
    name: item.name,
    price: item.price,
    modifiers: []
  };
  const mods = adjacencyLists.get(item.id);
  mods.forEach(mod => {
    renderedItem.modifiers.push(renderItem(adjacencyLists, mod));
  });
  return renderedItem;
};

app.get("/restaurant/:restaurantId/item", async (req, res, next) => {
  const restaurantId = req.params.restaurantId;

  try {
    const itemResults = await knex
      .withSchema("presto")
      .from("item")
      .where("item.restaurant_id", restaurantId)
      .select();

    const mods = await knex
      .withSchema("presto")
      .from("modification")
      .join("item", "modification.source_id", "item.id")
      .where("item.restaurant_id", restaurantId)
      .select();

    const items = new Map();
    const adjacencyLists = new Map();
    const reverseLists = new Map();
    const mainItems = [];

    itemResults.forEach(item => {
      items.set(item.id, item);
      adjacencyLists.set(item.id, []);
      reverseLists.set(item.id, []);
    });

    mods.forEach(mod => {
      const sources = adjacencyLists.get(mod.target_id);
      if (sources !== undefined) {
        sources.push(items.get(mod.source_id));
        adjacencyLists.set(mod.target_id, sources);
      }
      const targets = reverseLists.get(mod.source_id);
      if (targets !== undefined) {
        targets.push(items.get(mod.target_id));
        reverseLists.set(mod.source_id, targets);
      }
    });

    reverseLists.forEach((targets, sourceItemId) => {
      if (targets.length === 0) {
        mainItems.push(items.get(sourceItemId));
      }
    });

    const result = mainItems.map(item => {
      return renderItem(adjacencyLists, item);
    });

    res.json(result);
  } catch(e) {
    next(e);
  }
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
