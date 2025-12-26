const express = require("express");
const userRouter = express.Router();
const User = require("../models/user.model");
const Post = require("../models/post.model");
userRouter.get("/create", async (req, res) => {
  try {
    let newUser = await new User({
      username: "Subhamoy",
      email: "subhamoy123@email.com",
      age: 25,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    if (error.code == 11000) {
      return res.status(200).json({
        status: 200,
        message: "Duplicate data",
      });
    }

    res.status(500).json({ message: "Server error" });
  }
});
userRouter.get("/show", async (req, res) => {
  try {
    let findUser = await User.findOne({ username: "Subhamoy" });
    res.send(findUser);
  } catch (error) {
    console.log("Error in /show of userRouste while showing data of a user");

    console.error(error);
  }
});
userRouter.get("/create/post", async (req, res) => {
  try {
    let newPost =  await new Post({
  postdata: "it is a testing post",
  user: "694e40a753d0bf8aa5f96308"
    });
    let user1 = await User.findById({_id: "694e40a753d0bf8aa5f96308"})
    user1.posts.push(newPost._id)
    await user1.save()
    res.send({
        "Posts": newPost,
        "User": user1
    });
  } catch (error) {
    console.log("Error in /show of userRouste while showing data of a user");

    console.error(error);
  }
});

module.exports = userRouter;
