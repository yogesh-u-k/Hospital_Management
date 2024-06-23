import jwt from "jsonwebtoken";

export const generateWebTokenAndSetCookies = (id,user, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
  res.cookie(cookieName, token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameStrict: "strict",
    secure: process.env.NODE_ENV !== "development",
  })
};
