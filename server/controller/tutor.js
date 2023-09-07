import { cloudinary } from "../utilities/cloudinary.js";
import teacherDb from "../model/teacher.js";
import jwt from "jsonwebtoken";
import orderDb from "../model/order.js";
import mongoose from "mongoose";
import messageDb from "../model/chat.js";
import studentDb from "../model/user.js";
import Transaction from "../model/transaction.js";

const googleAuthTutor = async (req, res) => {
  try {
 
    const email = req.body.datas.data.email;

    const tutor = await teacherDb.findOne({ email: email });

    if (tutor) {
      const ID = tutor._id;
      const token = jwt.sign({ ID }, process.env.JWT_SECRET_KEY, {
        expiresIn: 3000,
      });
      res.status(200).json({ status: true, token: token, tutor, message: "login success" });
    } else {
      res.status(200).json({ status: false, message: "email is not registered" });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const get_profile = async (req, res) => {
  try {
    await teacherDb
      .find({ email: "munavirokv@gmail.com" })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const edit_profile_image = async (req, res) => {
  try {
   
    console.log(req.body.ID);
    const profile = "my-profile-folder";
    const { ID, imgBase } = req.body;

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
        res.status(200).json({ status: true, data });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const create_slot = async (req, res) => {
  const ID = req.userId;
  const data = req.body.formValues;

  await teacherDb
    .findOneAndUpdate({ _id: ID }, { $push: { slot: data } })
    .then((data) => {
      res.status(200).json({ status: true });
     
    })
    .catch((err) => {
      res.status(200).json({ status: false });
      console.log(err);
    });
};
const get_slot = async (req, res) => {
  const ID = req.userId;

  //

  await teacherDb
    .findOne({ _id: ID })
    .then((data) => {
     
      const result = data.slot;
      res.status(200).json({ status: true, result });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ status: false });
    });
};

const get_bookings = async (req, res) => {


  const ID = req.userId;

  const objectId = new mongoose.Types.ObjectId(ID);

  try {
  

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
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.status(200).json({ status: true, result: data });
    console.log(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const booking_actions = async (req, res) => {
  console.log(req.body);
  const { value, order_id, slot_id } = req.body;
  const slotid = new mongoose.Types.ObjectId(slot_id);

  if (value === "accept") {
  

    try {
      const result = await orderDb.updateOne(
        { _id: order_id, "slot._id": slotid },
        { $set: { "slot.$.booking_status": "success" } }
      );
     

      res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);
    }
  } else if (value === "decline") {
    const result = await orderDb.updateOne(
      { _id: order_id, "slot._id": slotid },
      { $set: { "slot.$.booking_status": "failed" } }
    );

    await teacherDb.updateOne(
      {  "slot._id":  slotid },
      { $set: { "slot.$.booking_status": "boocked" } }
    );

    res.status(200).json({ status: true });
  }
};

const create_chat = async (req, res) => {
  const { message, student } = req.body;

  try {
    await messageDb
      .create({
        sender: req.userId,
        receiver: student,
        message: message,
      })
      .then((data) => {
        console.log(data);
        res.status(200).json({ result: data });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const get_messages = async (req, res) => {


  const { student } = req.query;
  const teacher = req.userId;

  try {
    const messageSend = await messageDb.find({
      sender: teacher,
      receiver: student,
    });

    const messageRecieved = await messageDb.find({
      sender: student,
      receiver: teacher,
    });

    const result = messageRecieved.concat(messageSend);

    result.sort(function (a, b) {
      return a.createdAt - b.createdAt;
    });

    res.status(200).json({ result: result });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const get_chat_reciever = async (req, res) => {
  const { student } = req.query;
  await studentDb.findById(student).then((data) => {
    res.status(200).json({ result: data });
  });
};

const get_monthlylineChart = async (req, res) => {
  try {
   
    const teacherId = req.userId;
   
    const monthlyReport = await Transaction.aggregate([
      {
        $match: {
          teacher: teacherId,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalProfit: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": -1 } },
    ]);
  console.log( "_id.month");
    console.log(monthlyReport);
    res.status(200).json({result:monthlyReport});
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const dailyReport = async (req, res) => {
  try {

   const {selectedDate}=req.query



    const teacherId = req.userId;

   

    let date = new Date(selectedDate);
    let startDate = new Date(date.setUTCHours(0, 0, 0, 0));
    let endDate = new Date(date.setUTCHours(23, 59, 59, 999));
    const objectId = new mongoose.Types.ObjectId(teacherId);
    const todayBooking = await orderDb.aggregate([
      {
        $match: {
          teacher: objectId,
          createdAt: { $lt: endDate, $gt: startDate },
        },
      },
      {
        $group: {
          _id: "",

          todayTotal: { $sum: "$amount" },
          slots: { $sum: { $size: "$slot" } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    console.log(todayBooking, "ajdsnj");
    if (todayBooking.length !== 0) {
      const totalAmount =todayBooking[0].todayTotal;
      const totalOrder =todayBooking[0].count;
      const totalSlot = todayBooking[0].slots;

      res.status(200).json({ status: true, totalAmount, totalOrder, totalSlot });
    } else {
      res.status(200).json({ status: true, totalAmount: 0, totalOrder: 0, totalSlot: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const get_wallet=async(req,res)=>{
  console.log(req.userId);
  const ID=req.userId
await teacherDb.findOne({_id:ID}).then((data)=>{
 
  const wallet=data.wallet
  res.status(200).json({wallet})
})



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
  get_chat_reciever,
  get_monthlylineChart,
  dailyReport,
  get_wallet,
};
