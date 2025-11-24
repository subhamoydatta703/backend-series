const express = require("express");
const app = express();
const path = require("path");

// app.use((req, res, next) => {
//   console.log("middleware works");

//   next();
// });

// app.use((req, res, next) => {
//   console.log("middleware 2 works");
//   next();
// });

// logger-> give us the information about every request
app.use((req, res, next)=>{
    req.time= new Date(Date.now()).toString();
    console.log(req.time);
    // console.log(req.method);
    // console.log(req.url);
    // console.log(req.hostname);
    console.log(req.path);
    next();
    
})


const beforeRandom = (req, res, next)=>{
console.log("This runs before random");
next();

}

app.get("/", (req, res) => {
  res.send("main route");
});



app.get("/random", beforeRandom, (req, res) => {
  res.send("Random route");
});

app.listen(8080, () => {
  console.log("listen at 8080");
});


