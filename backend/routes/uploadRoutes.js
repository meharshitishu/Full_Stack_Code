import express from "express";
import {upload} from "../utils/cloudinary.js";

const router=express.Router();

router.post("/upload",upload.single("file"),(req,res)=>{
    res.json({url:req.file.path})
})

export default router;