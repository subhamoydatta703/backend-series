const express = require("express");
const path = require("path");

const app = express();

const port = 8080;

app.use(express.static(path.join(__dirname, "public")));


app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("<h1>Hello</h1>");
  res.render("home.ejs");
});

app.get("/random", (req, res) => {
  // res.send("<h1>Hello</h1>");

  let val = Math.floor(Math.random() * 10);
  res.render("random.ejs", { val });
});

app.get("/ig/:username", (req, res) => {
  let fol = ["yoyo", "dj", "me"];
  let { username } = req.params;

  res.render("insta.ejs", { username, fol });
});
app.get("/:animalName", (req, res) => {
    let { animalName } = req.params;
    const animal = require("./data.json")
let data = animal[animalName]
console.log(data);
if(data){
  res.render("animal.ejs", { data });
}else{
    res.render("error.ejs")
}

});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
