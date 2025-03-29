import jwt from "jsonwebtoken";

export const authenticate=async(req,res,next)=>{
    const token=req.header('Authorization');
    if(!token){
        return res.status(401).json({msg:"No token, authorization denied"})
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        res.status(401).json({msg:"Invalid token"});
    }
}

export const authorizeRoles=(roles)=>async(req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return res.status(403).json({msg:"Access denied"});
    }
    next();
}