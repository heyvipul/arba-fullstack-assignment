const express = require("express")
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs")
const cors = require("cors");
var cookieParser = require('cookie-parser')
const User = require("./models/User");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const PORT = process.env.PORT || 9000;
const MONGODB_URL = process.env.MONGODB_URL

const saltRounds = 10;
const jwtsecret = "sjkhfycndhskfe5848djhvicghjke"
const app = express();
app.use(express.json());
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

app.get("/",(req,res)=>{
    res.send("test ok")
})

app.post("/register", async (req, res) => {
    const { fullName, userName, email, password, avatar } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const userDoc = await User.create({
            fullName,
            userName,
            email,
            password: hashedPassword,
            avatar
        });
        res.send({message : "user register", user :userDoc});
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ error: "Error in registration" });
    }
});

app.post("/login",async(req,res)=>{
    const {userName,password} = req.body;

    const userDoc = await User.findOne({userName})
    if(userDoc){
        const passOk = bcrypt.compareSync(password,userDoc.password)
        if(passOk){
            jwt.sign({userName:userDoc.userName,id:userDoc._id},jwtsecret,{},(err,token)=>{
                if(err) throw err;
                res.json({token:token,userDoc:userDoc,data:"password match"}) 
            })

        }else{
            res.status(422).json("password wrong")
        }
    }else{
        res.json("user not found!")
    }
})


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})


