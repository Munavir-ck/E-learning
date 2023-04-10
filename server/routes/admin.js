import express from "express";
import  {adminAuth} from "../middileware/adminAuth.js"
import uplod from  "../utilities/multer.js"


import { login,
    add_teachers,
    get_teachers,
    upload_class,
    add_subject,
 } from "../controller/admin.js";
const router=express.Router()


router.post("/login",login)
router.post("/add_teachers",add_teachers)
router.get('/get_teachers',get_teachers)
router.post("/upload_class",uplod,upload_class)
router.post("/add_subject",add_subject)

export default router