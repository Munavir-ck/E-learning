import express from "express";
import  {adminAuth} from "../middileware/adminAuth.js"
import uplod from  "../utilities/multer.js"


import { login,
    add_teachers,
    get_teachers,
    upload_class,
    add_subject,
    get_wallet,
    get_transactions,
    share_profit,
    get_subject
 } from "../controller/admin.js";
const router=express.Router()


router.post("/login",login)
router.post("/add_teachers",add_teachers)
router.get('/get_teachers',get_teachers)
router.post("/upload_class",uplod,upload_class)
router.post("/add_subject",add_subject)
router.get("/get_wallet",get_wallet)
router.get("/get_transction",get_transactions)
router.post( "/share_profit",share_profit)
router.get("/get_subject",get_subject)
export default router