import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import hotelRouter from "./routes/hotels.js";
import roomRouter from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();

// db connection
const connect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Mongodb");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=> {
    console.log("MongoDB Disconnected!");
});

mongoose.connection.on("connected", ()=> {
    console.log("MongoDB Connected!");
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());
//Middlewares

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);

// error handling 
app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMsg = err.message || "Something wen wrong!";
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: err.stack,
    })
})


//backend connection
app.listen(4000, ()=> {
    connect()
    console.log("Conncted to backend!");
})