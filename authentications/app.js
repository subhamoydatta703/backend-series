const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

// middleware(global middleware) -> runs before every route and check for cookies present or not?
app.use(cookieParser());
app.get("/", (req, res)=>{
    // res.cookies()-> used to set cookies to the browser 
   res.cookie("age", 25);
//    console.log(val.data.age);
   res.send("ok")
   
})

app.get("/getcookies",(req, res)=>{
    // reading the cookies that is send by the browser
console.log(req.cookies);
res.send(req.cookies.age)

})


app.listen(8080, ()=>{
    console.log("Listening at 8080");
    
})