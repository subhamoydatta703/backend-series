const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// later use
// let hashedPass = "";
// async function beforeCompare(req, res, next) {
//   try {
//     if (!hashedPass) {
//       return res.send("Password not find");
//     }
//     const isMatch = await bcrypt.compare(req.body.password, hashedPass);
//     if (!isMatch) {
//       return res.send("Password not matched");
//     }
//     next();
//   } catch (error) {
//     console.log("Error while comparing the bcrypt or hashing");
//     console.error(error);
//   }
// }

async function beforeGetData(req, res, next) {
  try {
    let token = req.cookies.myToken;
    if (!token) {
      return res.redirect("/login");
    }
    jwt.verify(token, process.env.SECRET_KEY);

    next();
  } catch (error) {
    console.log("Error while using middleware beforeGetData");
    console.error(error);
  }
}
// form(get method) for adding new data
router.get("/create", (req, res) => {
  res.render("logout.ejs");
});
router.get("/create/new", (req, res) => {
  res.render("index.ejs");
});

// form(post) for adding new data
router.post("/create", async (req, res) => {
  try {
    let { password } = req.body;

    const passAfterHashed = await bcrypt.hash(password, 10);
    console.log("Pass hashed");
    console.log("Pass: ", passAfterHashed);

    const newUser = new User({
      ...req.body,
      password: passAfterHashed,
    });

    await newUser.save();
    //   hashedPass = passAfterHashed;
    let jwtToken = await jwt.sign(
      {
        user_email: req.body.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("myToken", jwtToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    console.log("myToken: ", jwtToken);

    res.redirect("/create");
  } catch (error) {
    console.log(
      "Error while hashing, route: /create in post of user.router.js"
    );
    console.error(error);
  }
});
// login
router.get("/login/done", beforeGetData, (req, res) => {
  res.render("logout.ejs");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});
router.post("/login/new", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.redirect("/create");
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect("/login");
    }
    let jwtToken = await jwt.sign(
      {
        user_email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("myToken", jwtToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.redirect("/login/done");
  } catch (error) {
    console.log("Error inside /login/new route(post) of user.router.js");
    console.error(error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("myToken");
  res.redirect("/login");
});

module.exports = router;
