const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const Post = require("../models/post.model");
userRouter.get("/signup", (req, res) => {
  res.render("index.ejs");
});
// userRouter.get("/show", async (req, res) => {
//   try {
//     let findUser = await User.findOne({ username: "Subhamoy" });
//     res.send(findUser);
//   } catch (error) {
//     console.log("Error in /show of userRouste while showing data of a user");

//     console.error(error);
//   }
// });
async function beforeGetData(req, res, next) {
  try {
    let token = req.cookies.myToken;
    if (!token) {
      return res.redirect("/login");
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error while using middleware beforeGetData");
    console.error(error);
    return res.redirect("/login");
  }
}
userRouter.post("/create", async (req, res) => {
  let { username, name, age, email, password } = req.body;
  try {
    let newUser = await User.findOne({ email });
    if (newUser) {
      console.log("User already exist");

      return res.redirect("/signup");
    }

    let passAfterHashed = await bcrypt.hash(password, 10);
    console.log("Pass hashed");
    console.log("Pass: ", passAfterHashed);
    newUser = new User({
      ...req.body,
      password: passAfterHashed,
    });
    await newUser.save();
    const payload = {
      userId: newUser._id,
      email: newUser.email,
    };
    const jwtToken = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("myToken", jwtToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.status(201).send("User created in db");
  } catch (error) {
    console.log("Error in /show of userRouste while showing data of a user");
    res.status(500).send("Server error...");

    console.error(error);
  }
});
userRouter.get("/login", (req, res) => {
  res.render("login.ejs");
});
userRouter.post("/login/new", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.redirect("/signup");
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect("/login");
    }
    const payload = {
      userId: user._id,
      email: user.email,
    };
    const jwtToken = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("myToken", jwtToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
});
userRouter.get("/profile", beforeGetData, async (req, res) => {
  let theUser = await User.findOne(req.user.id);
  res.render("logout.ejs", { theUser });
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie("myToken");
  res.redirect("/login");
});

module.exports = userRouter;
