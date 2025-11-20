const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");

// Router helps us create separate route files.
// It works like a small Express app where we write routes.
// it helps us to create different routes and connect them with the servewr that reduces complexity
// Later, we connect this router to the main server.

router.get("/chat", async (req, res) => {
  console.log("Home route");

  try {
    let datas = await Chat.find();
    res.render("show.ejs",{datas});
    console.log(datas);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
