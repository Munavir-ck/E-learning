import express from "express";
import { verifyuserJWT } from "../middileware/userAuth.js";
import { get_profile
    ,edit_profile_image
    ,googleAuthTutor,
    create_slot,
    get_slot,
} from "../controller/tutor.js";
const router=express.Router()

router.get("/get_profile",get_profile)
router.post("/edit_profile_image",edit_profile_image)
router.post("/create_slot", verifyuserJWT,create_slot)
router.get("/get_slot", verifyuserJWT, get_slot,)



export default router