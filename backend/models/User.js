const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-YwrVVjOv028wj9HZ_0_GUizZdQhoxB_C2Q_0yfYgA&s"
    },
    forgetPasswordToken: {
        type : String
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
