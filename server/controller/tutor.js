import { cloudinary } from "../utilities/cloudinary.js";
import teacherDb from "../model/teacher.js";
import jwt from "jsonwebtoken";

const googleAuthTutor = async (req, res) => {
  try {
    console.log(1111111111111);
    console.log(req.body.datas.data.email);
    const email = req.body.datas.data.email;

    const tutor = await teacherDb.findOne({ email: email });

    if (tutor) {
      const ID = tutor._id;
      const token = jwt.sign({ ID  }, process.env.JWT_SECRET_KEY, {
        expiresIn: 300,
      });
      res.json({ status: true, token: token, tutor, message: "login success" });
    } else {
      res.json({ status: false, message: "email is not registered" });
    }
  } catch (error) {
    console.log(error);
  }
};

const get_profile = async (req, res) => {
  try {
    await teacherDb
      .find({ email: "munavirokv@gmail.com" })
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

const edit_profile_image = async (req, res) => {
  try {
    console.log(222222222222);
    console.log(req.body.ID);
    const profile = "my-profile-folder";
    const { ID, imgBase } = req.body;
    console.log(3333333333);
    const result = await cloudinary.uploader
      .upload(imgBase, {
        folder: profile,
      })
      .catch((err) => {
        console.log(err);
      });

    await teacherDb
      .findOneAndUpdate({ _id: ID }, { image: result.secure_url })
      .then((data) => {
        res.json({ status: true, data });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

const create_slot=async(req,res)=>{

    
    const ID=req.userId
    const data=req.body.formValues

    await teacherDb.findOneAndUpdate(
        {_id: ID},
        { $push: { slot:data } }
    ).then((data)=>{

        res.json({status:true})
        console.log(data);
    }).catch((err)=>{
        res.json({status:false})
        console.log(err);
    })
}
const get_slot=async(req,res)=>{

    const ID=req.userId  
    
//    

  await teacherDb.findOne({_id:ID}).then((data)=>{
    console.log(data);
    const result=data.slot
    res.json({status:true,result})
  }).catch((err)=>{
    console.log(err);
    res.json({status:false})
  })

}


export { edit_profile_image
    , get_profile, 
    googleAuthTutor,
    create_slot,
    get_slot,
 };
