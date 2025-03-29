import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/upload",uploadRoutes)

const PORT=process.env.PORT || 5000;

sequelize.sync()
.then(()=>{
    console.log("Database connected");
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    })
}).catch((err)=>console.log(err));





