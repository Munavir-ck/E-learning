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
    get_subject,
    monthlylineChart,
    dailyReport,
    pieChart,
 } from "../controller/admin.js";
const router=express.Router()


router.post("/login",login)
router.post("/add_teachers",adminAuth,add_teachers)
router.get('/get_teachers',adminAuth,get_teachers)
router.post("/upload_class",adminAuth,uplod,upload_class)
router.post("/add_subject",adminAuth,add_subject)
router.get("/get_wallet",adminAuth,get_wallet)
router.get("/get_transction",adminAuth,get_transactions)
router.post( "/share_profit",adminAuth,share_profit)
router.get("/get_subject",adminAuth,get_subject)
router.get("/get_monthlylineChart",adminAuth,monthlylineChart)
router.get( "/get_dailyReport",adminAuth,dailyReport)
router.get("/get_piechart",adminAuth,pieChart)
export default router