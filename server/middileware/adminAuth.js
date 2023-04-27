import jwt from  "jsonwebtoken"

const adminAuth=async(req,res,next)=>{

    console.log(process.env.JWT_SECRET_KEY);
 
    const token=req.headers['authorization']
    if(!token){
        res.send({ status:false, "message": "You need token" })
       
    }
    else{


    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decode)=>{

     if(err){
     
        return res.json({status:false,message:"failed to authenticate"})
     }
     else{
       
      req.User=decode.adminMail
        next()
     }


    })  

    }
   
  



}
export   {adminAuth};