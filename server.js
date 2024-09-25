const express = require("express");
const app = express()
require("./src/config/db");
require('dotenv').config();
const PORT = process.env.PORT


app.use(express.json())

const userRouter = require("./src/routes/user_router")
app.use("/api/user", userRouter)




app.listen(PORT, () => {
    console.log(`Server Running Port No.${PORT}`);
})