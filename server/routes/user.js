import express from "express";
import passport from "passport";
import UserDB from '../model/user.js'
import {googleAuthTutor} from "../controller/tutor.js";
import { verifyuserJWT } from "../middileware/userAuth.js";
// import auth from '../middileware/googleAuth.js'

import { signup,login,
    get_classes,
    googleAthentication,
    get_otp,
    verify_otp,
    get_teachers,
    search_class,
    search_teacher,
    filter_teachers,
    get_subject,
    get_profile,
    edit_profile_image,
    get_teacherDetais,
    reservation_page,
    filter_slot,
    get_slots_user,
    creat_booking,
    order_success,
} from "../controller/user.js";
const router=express.Router()


router.post("/signup",signup)
router.post( "/login",login)
router.get("/auth/google/callback",passport.authenticate( "google",{
    successRedirect: "http://localhost:5001/googleAthentication",
    // failureRedirect: "http://localhost:3000/login",
    failureFlash: true,
}))

router.get( "/google",passport.authenticate( "google",[ "profile","email"]))
router.get("/get_classes",get_classes)

router.post("/googleAuth",googleAuthTutor)
router.get("/googleAthentication",googleAthentication)
router.post("/get_otp",get_otp)
router.post("/verify_otp",verify_otp)
router.get('/get_teachers',get_teachers)
router.post( '/search_class',search_class)
router.post("/search_teacher",search_teacher)
router.get('/filter_teachers',filter_teachers)
router.get("/get_subject",get_subject)
router.get("/get_profile",verifyuserJWT,get_profile)
router.post("/edit_profile_image",verifyuserJWT,edit_profile_image)
router.get("/get_teacherDetails",get_teacherDetais)
router.get("/reservation_page",verifyuserJWT,reservation_page)
router.post("/filter_slot",verifyuserJWT,filter_slot)
router.get("/get_slot",verifyuserJWT,get_slots_user)
router.post("/creat_booking",verifyuserJWT,creat_booking)
router.post("/order_success",verifyuserJWT,order_success)

export default router
