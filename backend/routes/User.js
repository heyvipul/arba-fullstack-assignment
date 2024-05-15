const express = require('express');
const router = express.Router();
const multer = require("multer")
const User = require("../models/User");
const bcrypt = require("bcryptjs")
const path = require('path');
const fs = require('fs');
const jwt = require("jsonwebtoken");
const imageDownloader = require('image-downloader');
const saltRounds = 10;
const jwtsecret = "sjkhfycndhskfe5848djhvicghjke"

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const generateToken = () => {
    return bcrypt.hashSync(new Date().toString(), bcrypt.genSaltSync(10));
};

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


//user-register
router.post("/register", async (req, res) => {
    const { fullName, userName, email, password, avatar } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const forgetPasswordToken = generateToken();
        const userDoc = await User.create({
            fullName,
            userName,
            email,
            password: hashedPassword,
            forgetPasswordToken,
        });
        res.send({ message: "User registered", user: userDoc });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ error: "Error in registration" });
    }
});

//user-login
router.post("/login", async (req, res) => {
    const { userName, password } = req.body;

    const userDoc = await User.findOne({ userName })
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({ userName: userDoc.userName, id: userDoc._id }, jwtsecret, {}, (err, token) => {
                if (err) throw err;
                res.json({ token: token, userDoc: userDoc, data: "password match" })
            })

        } else {
            res.status(422).json("password wrong")
        }
    } else {
        res.json("user not found!")
    }
})


//user change password 
router.put("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!bcrypt.compareSync(currentPassword, user.password)) {
            return res.status(400).json({ error: "Current password is incorrect" });
        }
        const hashedNewPassword = bcrypt.hashSync(newPassword, saltRounds);
        user.password = hashedNewPassword;
        await user.save();
        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/user", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ token: user.forgetPasswordToken, message: "Token sent successfully!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});



//user forget-password
router.post("/forget-password", async (req, res) => {
    try {
        const { email, token, newPassword } = req.body;

        // Find user by email and token
        const user = await User.findOne({ email, forgetPasswordToken: token });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or token" });
        }

        // Update user's password
        const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// route -image upload 
router.post('/update-avatar', upload.single('avatar'), async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.avatar = `/uploads/${req.file.filename}`;
        await user.save();
        res.json({ message: "Avatar updated successfully", avatar: user.avatar });
    } catch (error) {
        console.error("Error updating avatar:", error);
        res.status(500).json({ error: "Server error" });
    }
});





module.exports = router;
