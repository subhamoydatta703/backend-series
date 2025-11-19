const mongoose = require("mongoose");

// perform db connection

async function connectionDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    console.log("DB connected");
  } catch (error) {
    console.log("DB not connected: ", error);
  }
}

module.exports = connectionDB;