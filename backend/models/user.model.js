const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: {
        type: String,
        minLength: [10, "no should have minimum 10 digits"],
        maxLength: [10, "no should have maximum 10 digits"],
        match: [/\d{10}/, "no should only have digits"]
    },
    password:{type:String, required:true}, 
    role:{type:String, enum:["admin", "buyer", "seller"], default:"buyer"}
})

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
