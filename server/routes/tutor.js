import express from "express";
import { verifyuserJWT } from "../middileware/userAuth.js";
import { get_profile
    ,edit_profile_image
    ,googleAuthTutor,
    create_slot,
    get_slot,
    get_bookings,
    booking_actions,
    create_chat,
    get_messages,
    get_chat_reciever,
    get_monthlylineChart,
    dailyReport,
    get_wallet,
} from "../controller/tutor.js";
const router=express.Router()

router.get("/get_profile",get_profile)
router.post("/edit_profile_image",edit_profile_image)
router.post("/create_slot", verifyuserJWT,create_slot)
router.get("/get_slot", verifyuserJWT, get_slot,)
router.get('/get_bookings',verifyuserJWT,get_bookings)
router.post("/booking_actions",verifyuserJWT,booking_actions)
router.post( "/create_chat",verifyuserJWT,create_chat)
router.get("/get_messages", verifyuserJWT,get_messages)
router.get("/get_chat_reciever",verifyuserJWT,get_chat_reciever)
router.get("/get_monthlylineChart",verifyuserJWT,get_monthlylineChart)
router.get( "/get_report",verifyuserJWT,dailyReport)
router.get("/get_wallet",verifyuserJWT,get_wallet)


export default router