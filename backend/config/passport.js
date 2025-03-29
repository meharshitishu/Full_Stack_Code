import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../model/User.js";

passport.use(new GoogleStrategy({
    clientId:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'/api/auth/google/callback'
},async(accessToken,refreshToken,profile,done)=>{
    let user=await User.findOne({where:{googleId:profile.id}});
    if(!user){
        user =await User.create({googleId:profile.id,email:profile.emails[0].value});
    }
    return done(null ,user);
}
))

export default passport;