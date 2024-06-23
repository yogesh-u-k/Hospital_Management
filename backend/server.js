import express from "express";
import dotenv from "dotenv";
import connectMongodb from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import messageRouter from "./routes/message.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
console.log(process.env.MONGOURI);
const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  connectMongodb();
});
