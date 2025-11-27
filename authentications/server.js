const express = require("express");
const path = require("path");
const {connectDB} = require('./db/connection')
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
//   res.send("Main route");
res.render("index.ejs")
});

app.listen(8080, () => {
  console.log("App is listening at 8080");
});
