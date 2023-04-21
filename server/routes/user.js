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
    get_filtred_subject,
    get_profile,
    edit_profile_image,
    get_teacherDetais,
    reservation_page,
    filter_slot,
    get_slots_user,
    creat_booking,
    order_success,
    get_bookings,
    cancel_booking,
    create_chat,
    get_messages,
    get_chat_reciever,
    customer_review,
    get_reviews,
    get_subject,
    filter_our_teacher,
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
router.get("/get_filtred_subject",get_filtred_subject)
router.get("/get_profile",verifyuserJWT,get_profile)
router.post("/edit_profile_image",verifyuserJWT,edit_profile_image)
router.get("/get_teacherDetails",get_teacherDetais)
router.get("/reservation_page",verifyuserJWT,reservation_page)
router.post("/filter_slot",verifyuserJWT,filter_slot)
router.get("/get_slot",verifyuserJWT,get_slots_user)
router.post("/creat_booking",verifyuserJWT,creat_booking)
router.post("/order_success",verifyuserJWT,order_success)
router.get("/get_bookings",verifyuserJWT,get_bookings)
router.post("/cancel_booking",verifyuserJWT,cancel_booking)
router.post("/create_chat",verifyuserJWT,create_chat)
router.get("/get_messages",verifyuserJWT,get_messages)
router.get("/get_chat_reciever",verifyuserJWT,get_chat_reciever)
router.post("/customer_review",verifyuserJWT,customer_review)
router.get("/get_reviews",get_reviews)
router.get("/get_subject",get_subject)
router.post("/filter_our_teacher",filter_our_teacher)


export default router
