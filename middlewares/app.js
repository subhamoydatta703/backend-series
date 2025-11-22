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


app.use((req, res, next)=>{
    req.time= new Date(Date.now()).toString();
    console.log(req.time);
    console.log(req.method);
    console.log(req.url);
    console.log(req.hostname);
    console.log(req.path);
    next();
    
})

app.get("/", (req, res) => {
  res.send("main rrot");
});

app.get("/random", (req, res) => {
  res.send("Random route");
});

app.listen(8080, () => {
  console.log("listen at 8080");
});
