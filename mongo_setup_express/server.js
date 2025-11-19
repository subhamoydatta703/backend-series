const express = require("express");
const app = express();
const path = require("path");
const connectionDB = require("./db/connection")

// main server

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

connectionDB();
app.get("/", (req, res) => {
  res.send("Route is working");
});

app.listen(8080, () => {
  console.log("listening at 8080");
});

