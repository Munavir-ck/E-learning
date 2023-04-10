import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

import User from "../model/user.js"

 let userData;

export default  passport.use(
 
    new GoogleStrategy(

        {
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_SECRET_ID,
        callbackURL: "/auth/google/callback",
        scope:["profile","email"]

        },
        async (accessToken,refreshToken,profile,callback)=> {
            const userdbs=await User.find({})
            console.log(userdbs);
            console.log(profile.emails[0].value,1111111);
             userData = await User.findOne({ email: profile.emails[0].value });
            console.log(userData);
            if (!userData) {
                return callback(null, false, { message: 'No user found with that email.' });
              }
            console.log(15555555555555);
            console.log(profile);

            callback(null,profile)
        }
    )
)
passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})
export {userData};
