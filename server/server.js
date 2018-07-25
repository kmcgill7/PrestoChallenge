const express = require("express");

// Constants
const PORT = 8080;

// App
const app = express();
app.get("/", (req, res) => {
  res.send("Hello Presto!\n");
});

app.get("/restaurant/:restaurantId/item", (req, res) => {
  res.send();
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
