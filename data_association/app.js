const express = require('express')
const app = express()
const connectDB = require("./db/connect");
const userRouter = require("./routes/user.route");
require("dotenv").config();
app.use(express.json());
connectDB();
app.use(userRouter)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
