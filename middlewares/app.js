const express = require("express");
const app = express();
const path = require("path");

app.use((req, res, next) => {
  console.log("middleware works");

  next();
});

app.use((req, res, next) => {
  console.log("middleware 2 works");
  next();
});
app.get("/", (req, res) => {
  res.send("main rrot");
});

app.get("/random", (req, res) => {
  res.send("Random route");
});

app.listen(8080, () => {
  console.log("listen at 8080");
});
