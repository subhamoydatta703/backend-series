const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

const url =
  "https://api.open-meteo.com/v1/forecast?latitude=22.7016704&longitude=88.4015104&current_weather=true";
const url2 = "https://dog.ceo/api/breeds/image/random";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/weather", async (req, res) => {
  try {
    let resp = await axios.get(url);

    let { temperature } = resp.data.current_weather;

    res.render("show.ejs", { temperature });
  } catch (error) {
    console.log(error);
  }
});

app.get("/dog", async (req, res) => {
  try {
    let datas = await axios.get(url2);
    // console.log(datas.data);
    let {message} = datas.data;
    res.render("dogs.ejs", {message})
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Listening at 3000");
});
