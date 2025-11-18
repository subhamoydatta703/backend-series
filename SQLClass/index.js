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
