import { generateWebTokenAndSetCookies } from "../lib/utils/generateToken.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

// Register a new patient
export const patientRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNo, message, dob, gender, password, role } = req.body;
        if (!firstName || !lastName || !email || !phoneNo || !message || !dob || !gender || !password || !role) {
            return res.status(400).json("Please Fill The Form");
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json("User Already registered");
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            phoneNo,
            message,
            dob,
            gender,
            password: hashPassword,
            role
        });

        if (newUser) {
            await newUser.save();
            generateWebTokenAndSetCookies(newUser._id, res);
            res.status(201).json({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                phoneNo: newUser.phoneNo,
                message: newUser.message,
                dob: newUser.dob,
                gender: newUser.gender,
                role: newUser.role
            });
        } else {
            res.status(400).json({ error: "Invalid User Data" });
        }
    } catch (error) {
        console.log(`Error in useregister ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Login a user
export const login = async (req, res) => {
    try {
        const { email, password, confirmPassword, role } = req.body;

        if (!email || !password || !confirmPassword || !role) {
            return res.status(400).json("Please provide all the details");
        }
        if (password !== confirmPassword) {
            return res.status(400).json("Password is not matching");
        }

        const user = await User.findOne({ email }).select("+password");
        const isPasswordMatched = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordMatched) {
            return res.status(400).json("Invalid email or password");
        }
        if (role !== user.role) {
            return res.status(400).json({ error: "User With This Role Not Found" });
        }

        generateWebTokenAndSetCookies(user._id, user, res);

        res.status(201).json({
            success: true,
            message: "User Logged Successfully!"
        });
    } catch (error) {
        console.log(`Error in login ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Add a new admin
export const addNewAdmin = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNo, message, dob, gender, password } = req.body;
        if (!firstName || !lastName || !email || !phoneNo || !message || !dob || !gender || !password) {
            return res.status(400).json("Please Fill The Form");
        }

        const isRegistered = await User.findOne({ email });

        if (isRegistered) {
            return res.status(400).json(`${isRegistered.role} with this email already registered`);
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newAdmin = new User({
            firstName,
            lastName,
            email,
            phoneNo,
            message,
            dob,
            gender,
            password: hashPassword,
            role: "Admin"
        });

        if (newAdmin) {
            await newAdmin.save();
            generateWebTokenAndSetCookies(newAdmin._id, res);
            res.status(201).json({
                firstName: newAdmin.firstName,
                lastName: newAdmin.lastName,
                email: newAdmin.email,
                phoneNo: newAdmin.phoneNo,
                message: newAdmin.message,
                dob: newAdmin.dob,
                gender: newAdmin.gender,
                role: newAdmin.role
            });
        } else {
            res.status(400).json({ error: "Invalid User Data" });
        }
    } catch (error) {
        console.log(`Error in admin login ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Get user details
export const getUserDetails = async (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    });
};


