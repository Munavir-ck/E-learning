import jwt from  "jsonwebtoken"

const adminAuth=async(req,res,next)=>{

    console.log(process.env.JWT_SECRET_KEY);
 console.log(999999999);
    const token=req.headers['admintoken']
    if(!token){
        res.send({ status:false, "message": "You need token" })
       
    }
    else{
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decode)=>{

     if(err){
        console.log(err);
        console.log(77777777);
        return res.json({status:false,message:"failed to authenticate"})
     }
     else{
        console.log(666666);
      req.User=decode.adminMail
        next()
     }


    })  

    }
   
  



}
export   {adminAuth};