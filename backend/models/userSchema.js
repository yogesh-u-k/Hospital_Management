import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, "first name must contains atleast 3 charecters"],
  },
  lastName: {
    type: String,
    required: true,
    minlength: [3, "Last name must contains atleast 3 charecters"],
  },
  email: {
    type: String,
    required: true,
    validator: [validator.isEmail, "Please Provide a Valid Email Id "],
  },
  phoneNo: {
    type: String,
    required: true,
    minlength: [10, "Phone No. Must Contains Exact 10 Digits!"],
    maxlength: [10, "Phone No. Must Contains Exact 10 Digits!"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Phone No. Must Contains Exact 8 charecters!"],
    select: false,
  },
  role: {
    type: String,
    required:true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment: {
    type: String,
  },

  docAvatar: {
    public_id: String,
    url: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
