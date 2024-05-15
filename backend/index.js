const express = require("express")
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs")
const cors = require("cors");
const path = require('path');
var cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");
const productRouter = require("./routes/productRouter");
const User = require("./routes/User")
const Category = require("./routes/Category")
require("dotenv").config();
const PORT = process.env.PORT || 9000;
const MONGODB_URL = process.env.MONGODB_URL


const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/backend', User);

app.use(cors({
    origin : "*"
}))

async function main(){
    try {
        await mongoose.connect(MONGODB_URL)
        console.log("connected to mongodb successfully");
    } catch (error) {
        console.log("mongodb connection failed!");   
    }
}
main();

//testing route
app.get("/",(req,res)=>{
    res.send("test ok")
})


//all-routes
app.use("/",User)
app.use('/products', productRouter);
app.use('/category', Category);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})


