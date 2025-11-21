const express = require("express");
const app = express();
const path = require("path");
const connectionDB = require("./db/connection");
const chatRoutes = require("./routes/chatRoutes");
const methodOverride = require("method-override");


// main server

app.use(express.json());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(chatRoutes)
connectionDB();
app.get("/", (req, res) => {
  // res.send("Main server working");
  console.log("Main server is working");
res.redirect("/chat")
  
});



app.listen(8080, () => {
  console.log("listening at 8080");
});

