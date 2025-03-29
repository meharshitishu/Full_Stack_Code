import bcrypt, { hash } from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import sendEmail from "../utils/emailService.js";

export const registerController = async (req, res) => {
    try {
        const {email,password,role}=req.body;

        const userExists=await User.findOne({where:{email}});
        if(userExists){
            return res.status(400).json({message:"Email already exists"});
        }

        const salt=bcrypt.genSalt(10);
        const hashedPassword=bcrypt.hash(password,salt);

        const newUser=await User.create({
            email,password:hashedPassword,role
        })

        res.json({msg:"User registered",newUser});

        // const token=jwt.sign({id:newUser.id},process.env.JWT_SECRET,{expiresIn:"1h"});

        // const verificationLink=`http://localhost:5000/auth/verify/${token}`;

        // await sendEmail(email,"Verify your Email", `Click on the link to verify email: ${verificationLink}`);
        // res.status(201).json({message:"User registered,please verify your email"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

// export const emailVerificationController=async(req,res)=>{
//     try {
//         const {token}=req.params;
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);

//         const user=await User.findByPk(decoded.id);

//         if(!user)return res.status(400).json({message:"Invalid token"});

//         user.isVerified=true;
//         await user.save();

//         res.status(200).json({message:"Email verified successfully"});
//     } catch (error) {
//         res.status(400).json({error:"Invalid or expired token"});
//     }
// };

export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({where:{email}});

        if(!user){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const isPasswordMatch=await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }

        // if(!user.isVerified){
        //     res.status(403).json({message:"Please verify your email first"})
        // }

        const token=jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});

        res.status(200).json({token,user});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}