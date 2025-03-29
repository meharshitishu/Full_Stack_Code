import express from "express";
import { registerController,loginController} from "../controller/authController.js";
import passport from "passport";

const router=express.Router();

router.post("/register",registerController);
router.post("/login",loginController);

router.get("/google",passport.authenticate('google',{scope:['profile','email']}));
router.get('/google/callback',passport.authenticate('google',{session:false}),(req,res)=>{
    res.json({token:req.user.token});
})


export default router;