import { cloudinary } from "../utilities/cloudinary.js";
import teacherDb from "../model/teacher.js";
import jwt from "jsonwebtoken";
import orderDb from "../model/order.js";
import mongoose from "mongoose";
import  messageDb from "../model/chat.js";

const googleAuthTutor = async (req, res) => {
  try {
    console.log(1111111111111);
    console.log(req.body.datas.data.email);
    const email = req.body.datas.data.email;

    const tutor = await teacherDb.findOne({ email: email });

    if (tutor) {
      const ID = tutor._id;
      const token = jwt.sign({ ID }, process.env.JWT_SECRET_KEY, {
        expiresIn: 3000,
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

const create_slot = async (req, res) => {
  const ID = req.userId;
  const data = req.body.formValues;

  await teacherDb
    .findOneAndUpdate({ _id: ID }, { $push: { slot: data } })
    .then((data) => {
      res.json({ status: true });
      console.log(data);
    })
    .catch((err) => {
      res.json({ status: false });
      console.log(err);
    });
};
const get_slot = async (req, res) => {
  const ID = req.userId;

  //

  await teacherDb
    .findOne({ _id: ID })
    .then((data) => {
      console.log(data);
      const result = data.slot;
      res.json({ status: true, result });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: false });
    });
};

const get_bookings = async (req, res) => {
  console.log(2323232323);
  console.log(req.userId);

  const ID = req.userId;

  const objectId = new mongoose.Types.ObjectId(ID);

  try {
    // const data = await orderDb
    // .find({ teacher: ID })
    // .populate("student", "name phone")
    // .unwind("slot");

    const data = await orderDb.aggregate([
      {
        $match: { teacher: objectId },
      },
      {
        $lookup: {
          from: "users",
          localField: "student",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $unwind: "$slot",
      },
    ]);

    res.json({ status: true, result: data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const booking_actions = async (req, res) => {
  console.log(req.body);
  const { value, order_id, slot_id } = req.body;
  const slotid = new mongoose.Types.ObjectId(slot_id)
  
  if (value === "accept") {
    console.log(2323232323);

 
    try {
        const result = await orderDb.updateOne(
            { _id: order_id, "slot._id": slotid  },
            { $set: { "slot.$.booking_status": "success" } },
            )
       
            res.json({ status: true });
    } catch (error) {
        console.log(error);
    }
   
  
  } else if (value === "decline") {
   
    const result = await orderDb.updateOne(
        { _id: order_id, "slot._id": slotid  },
        { $set: { "slot.$.booking_status": "failed" } },
        )
   
        res.json({ status: true });
  }
};


const create_chat = async (req, res) => {
  const { message, student} = req.body;
  


  try {
    await  messageDb.create({
      sender: req.userId,
      receiver:student,
      message: message,
    })
      .then((data) => {
        console.log(data);
        res.json({result:data})
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

const get_messages=async(req,res)=>{
  console.log(req.query,222)

  const{student}=req.query
  const teacher=req.userId


  try {
   const messageSend= await  messageDb.find({
      sender:teacher,
      receiver:student
    })

    const messageRecieved=await messageDb.find({
      sender:student,
      receiver:teacher,
    })

    const result=messageRecieved.concat(messageSend)

  
    result.sort(function(a,b){
      return a. createdAt - b. createdAt;
    })

    
    res.json({result: result})

  } catch (error) {
    console.log(error);
  }
}

export {
  edit_profile_image,
  get_profile,
  googleAuthTutor,
  create_slot,
  get_slot,
  get_bookings,
  booking_actions,
  create_chat,
  get_messages,
};
