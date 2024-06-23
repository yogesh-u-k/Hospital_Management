import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
export const isAdminAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    if (!token) {
      return res.status(400).json("Admin is Not Authenticated");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
        return res.status(400).json("Invalid token");
      }
  
    req.user = await User.findById(decoded.id);
    
    if (req.user.role !== "Admin") {
      return res
        .status(403)
        .json(`${req.user.role} not authorized for this resources!`);
    }
    next();
  } catch (error) {
    console.log(`Error in adminauthentication ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const isPatientAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.patientToken;
    if (!token) {
      return res.status(400).json("Patient is Not Authenticated");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(404).json("User not found");
    }
    if (req.user.role !== "Patient") {
      return res
        .status(403)
        .json(`${req.user.role} not authorized for this resources!`);
    }
    next();
  } catch (error) {
    console.log(`Error in patientauthentication ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
