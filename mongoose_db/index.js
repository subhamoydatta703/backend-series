<<<<<<< HEAD
const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);
// here creates an User collection by using userSchema and this collection stored in const User

// model -> It creates an object (User) that represents the "users" collection in the database, // and this collection must obey the structure defined in userSchema.
// const Employee = mongoose.model("Employee", userSchema)

// Insert one data at a time

// const user1 = new User({
//     name:"Rahul",
//     email: "rahul123@email.com",
//     age: 28
// })

// user1.save()
//     .then((result) => {
//         console.log(result);

//     }).catch((err) => {
//         console.log(err);

//     });

//  best practice + code reuseability

// async function  createUser(your_name, your_email, your_age) {
//     try {
//         const  user = await User.create({
//             name: your_name,
//             email: your_email,
//             age: your_age
//         });
//         console.log("Your document", user);

//     } catch (error) {
//         console.log(err);

//     }

// }

// createUser("Rohan", "rohan234@email.com", 27)

// insert many documents at a time

// User.insertMany(
//     [
//   {
//     name: "Subhamoy Datta",
//     email: "subhamoy.datta@example.com",
//     age: 21
//   },
//   {
//     name: "Rohan Sharma",
//     email: "rohan.sharma@example.com",
//     age: 27
//   },
//   {
//     name: "Ananya Sen",
//     email: "ananya.sen@example.com",
//     age: 23
//   },
//   {
//     name: "Arjun Verma",
//     email: "arjun.verma@example.com",
//     age: 25
//   }
// ]

// ).then((result) => {
//     console.log(result);

// }).catch((err) => {
//     console.log(err);

// });

// many users modern and best practice
async function createManyUsers(manyData) {
  try {
    const users = await User.insertMany(manyData);
    console.log(users);
  } catch (error) {
    console.log(error);
  }
}

const datas = [
  {
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    age: 24,
  },
  {
    name: "Sourav Ghosh",
    email: "sourav.ghosh@example.com",
    age: 23,
  },
  {
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    age: 26,
  },
];

// createManyUsers(datas)

// getthe all users data
// async function findUser() {

//     try {
//        let res = await User.find({}).exec();
//        console.log(res);

//     } catch (error) {
//         console.log(error);

//     }
// }

// findUser()

// finding a specific user based on conditions
// async function findUser(userName, userAge) {

//     try {
//        let res = await User.find({ name: userName, age: {$gt: userAge}}).exec();
//        console.log(res);

//     } catch (error) {
//         console.log(error);

//     }
// }

// findUser("Sourav Ghosh", 18)
async function findSingleUser(userAge) {
  try {
    let res = await User.findOne({ age: { $gt: userAge } }).exec();
    console.log(res.name);
  } catch (error) {
    console.log(error);
  }
}

// update user data
async function updateUser(fndName, updAge) {
  try {
    // Updates the age of the first user whose name matches `fndName`.
    // Example: if fndName = "Rohit", it finds the first document where name = "Rohit"
    // and sets its age to `updAge`. Only one document is updated.

    const res = await User.updateOne({ name: fndName }, { age: updAge });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

async function delOneUser(delName) {
    try {
        const res = await User.deleteOne({ name: delName });
        console.log(res);
        
        
    } catch (error) {
        console.log(error);
        
    }
    
}


// updateUser("Rahul", 32);
// console.log("Single User");

findSingleUser(30);
console.log("Before call delOneUser");

delOneUser("Rahul")

=======
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
require("dotenv").config();

// connecting sql db
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
try {
  // query related to the connected sql db
  // inserting new user into the user data in table
  let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
  let user = ["1", "ronit", "ronitdoe@example.com", "password123ronit"];
  connection.query(q, user, (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log(result[0]);
    console.log(result[1]);
  });

  // ending/closing the connection
  connection.end();
} catch (error) {
  console.log(error);
}

let getRandomUser = () => {
  return {
    Id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

// console.log(getRandomUser());

// mysql -u root -p
>>>>>>> 441f1a79b1e11145abad30bc22b1b1bcc24e3d40
