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

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};
let data = []

for(let i=0; i<100; i++){

    console.log(getRandomUser());
    data.push(getRandomUser());
    
}

try {
  // query related to the connected sql db
  // inserting new user into the user data in table
  let q = "INSERT INTO user (id, username, email, password) VALUES ?";


  connection.query(q, [data], (err, result) => {
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


// // console.log(getRandomUser());

// // mysql -u root -p
