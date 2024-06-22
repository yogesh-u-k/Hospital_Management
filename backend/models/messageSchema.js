import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required:true,
        minlength:[3, "first name must contains atleast 3 charecters"]
    },
    lastName:{
        type: String,
        required:true,
        minlength:[3, "Last name must contains atleast 3 charecters"]
    },
    email:{
        type: String,
        required:true,
        validator: [validator.isEmail , "Please Provide a Valid Email Id "]
    },
    phoneNo:{
        type: String,
        required:true,
        minlength:[10, "Phone No. Must Contains Exact 10 Digits!"],
        maxlength:[10, "Phone No. Must Contains Exact 10 Digits!"]
    },

    message:{
        type: String,
        required:true,
        minlength:[10, "Message Must Contains At Least 10 charechters "], 
    },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
