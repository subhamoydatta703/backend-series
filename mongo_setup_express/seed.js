const connectionDB = require("./db/connection");
const Chat = require("./models/chat");

// perform db related operations(like CRUD operations in db)

connectionDB();

async function createChat(user1, user2, your_msg) {
  try {
    let chat1 = await Chat.create({
      from: user1,
      to: user2,
      msg: your_msg,
    });
    console.log(chat1);
  } catch (error) {
    console.log(error);
  }
}
createChat("Ronit", "Roshan", "Hello, Hello, I am Ronit");

let users = [
  {
    from: "Alice",
    to: "Bob",
    msg: "Hey Bob, long time no see!",
  },
  {
    from: "John",
    to: "Sarah",
    msg: "Don't forget our meeting tomorrow.",
  },
  {
    from: "Ravi",
    to: "Aisha",
    msg: "I'm on my way!",
  },
  {
    from: "Emma",
    to: "Lucas",
    msg: "Can you send me the file?",
  },
];

async function createManyChats(manyUsers) {
  try {
    let chats = await Chat.insertMany(manyUsers, {ordered: false});
    console.log(chats);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {createChat}
// createManyChats(users);
