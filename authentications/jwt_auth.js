const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(cookieParser());

let beforeGetData =  (req, res, next) => {
  try {
    let token = req.cookies.Token;
    if (!token) {
      return res.send("No token found");
    }

    let tokenVal =  jwt.verify(token, "secret_key");
    let time = new Date(tokenVal.iat * 1000).toString();
    console.log("Token match", tokenVal, "\nIssued at,", time);
    next();
  } catch (error) {
    console.log(error);
    return res.send("Invalid token");
  }
};

app.get("/setdata", async (req, res) => {
  try {
    let token = await jwt.sign({ email: "subhamoy@email.com" }, "secret_key", {
      expiresIn: "1h",
    });
    console.log(token);
    res.cookie("Token", token);
    res.send("Done");
  } catch (error) {
    console.log(error);
  }
});

app.get("/getdata", beforeGetData, (req, res) => {
  res.send("Token found, you are verified");
});

app.listen(3000, () => {
  console.log("Listen at 3000");
});
