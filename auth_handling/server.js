const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./db/connect");
const router = require("./routes/user.routes")
const cookieParser = require("cookie-parser");

require("dotenv").config();




// main server
app.use(cookieParser());
app.use(express.json());
app.set("view engine", "ejs");
// app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(router);
connectDB();
app.get("/", (req, res) => {
  console.log("Main server working");
   res.redirect("/create/new")

  
});



app.listen(8080, () => {
  console.log("listening at 8080");
});

