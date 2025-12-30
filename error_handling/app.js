const express = require("express");
const app = express();
const path = require("path");
const ExpressError = require("./ExpressError")




const beforeRandom = (req, res, next)=>{
console.log("This runs before random");
next();

}

app.get("/", (req, res) => {
  res.send("main route");
});
app.get("/err", (req, res) => {
 abcd==cabd;
});
// error handling middlewares of express
app.use((err, req, res, next) => {
  console.error("-----ERROR1 MIDDLEWARE-----");
  next(err);
 let errors =  new ExpressError(500,"Internal server error");
  return res.send(errors)
 
})
// app.use((err, req, res, next) => {
//   console.error("-----ERROR2 MIDDLEWARE-----");
//   next(err);
 
// })



app.get("/random", beforeRandom, (req, res) => {
  res.send("Random route");
});

app.listen(8080, () => {
  console.log("listen at 8080");
});


