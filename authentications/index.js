const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

// syntax -> to hash a password ->
//  const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);

// Compare a user's login password with the stored hashed password
// const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

// isMatch will be true if the password is correct
// isMatch will be false if the password is wrong

// hashing a password:

let hashedPass = "";
const beforeCompare = async (req, res, next) => {
  try {
    if (hashedPass) {
      const isMatch = await bcrypt.compare("MyPass", hashedPass);
      if (isMatch) {
        next();
      } else {
        console.log("Not match");
        res.send("Pass not match");
      }
    } else {
      console.log("No password exist");
    }
  } catch (err) {
    console.log(err);
  }
};

app.get("/", async (req, res) => {
  try {
    if (hashedPass === "") {
      const passAfterHashed = await bcrypt.hash("userPASSWORD", 10);
      console.log(passAfterHashed);
      hashedPass = passAfterHashed;
      res.send("Hashing done");
      console.log("pass:", hashedPass);
    }
  } catch (error) {
    console.log(error);
  }
});

// as hashing is not reversible -> instead of decrypting, we compare the user-given
// (input field) password with the hashed password

// or,

// Since hashing is irreversible, we cannot decrypt the stored password.
// So during login, we compare the user-entered password with the stored hashed password
// to check whether the password entered by the user is correct or not
// (i.e., matches the user's saved hashed password or not)

app.get("/compare", beforeCompare, (req, res) => {
  res.send("Not correct");
});

app.listen(8080, () => {
  console.log("Listening at 8080");
});
