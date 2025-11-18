const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const path = require("path");
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// connecting sql db
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};
// home route: showing total user count
app.get("/", (req, res) => {
  try {
    let q = `select count(*) from user`;

    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      // res.send(result);
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
      //   console.log();
    });
  } catch (error) {
    console.log(error);
    res.send("Some error occured in db");
  }
});
// showing all users details
app.get("/user", (req, res) => {
  try {
    let q = `select * from user`;

    connection.query(q, (err, result) => {
      if (err) throw err;
      // console.log(result);
      res.render("show.ejs", { users: result });
    });
  } catch (error) {
    console.log(error);
    res.send("Some error occured in db");
  }
});
app.get("/user/new",(req, res)=>{
  res.render("new.ejs")
})
// create a post
app.post("/user",(req, res)=>{
  console.log(req.body);
  let {username, email, password}= req.body;
try {
  // query related to the connected sql db
  // inserting new user into the user data in table
  let id = faker.string.uuid();

  let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";

  connection.query(q,[id, username, email, password] , (err, result) => {
    if (err) throw err;
    console.log(result);

    res.redirect("/user")
  });

  // ending/closing the connection

} catch (error) {
  console.log(error);
}


  
 
  
})

// go to edit page
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      console.log(users);
      let user = users[0];
      res.render("edit.ejs", { user });
    });
  } catch (error) {
    console.log(error);
    res.send("Some error occured in db");
  }
});

// update(db) route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  let { password: formPass, username: newUsername } = req.body;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      console.log(users);
      let user = users[0];
      if (user.password != formPass) {
        res.send("Wrong password");
      } else {
        let q2 = `UPDATE user set username='${newUsername}' WHERE id='${id}'`;

        connection.query(q2, (err, result) => {
          if (err) throw err;

          // res.send(result);
          res.redirect("/user")
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Some error occured in db");
  }
});

app.listen(8080, () => {
  console.log(`Listening at 8080`);
});
