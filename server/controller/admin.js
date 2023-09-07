import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import teacherDb from "../model/teacher.js";
import ffmpeg from "fluent-ffmpeg";
import videoDb from "../model/demo_class.js";
import thumbsupply from "thumbsupply";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import subjectDb from "../model/subject.js";
import Wallet from "../model/wallet.js";
import Transaction from "../model/transaction.js";
import orderDb from "../model/order.js";

ffmpeg.setFfmpegPath(ffmpegPath.path);


dotenv.config({ silent: process.env.NODE_ENV === "production" });

const login = async (req, res) => {
  try {
    const { email, password } = req.body.formValues;
   
    const adminMail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminMail === email) {
  
      if (adminPassword === password) {
        const token = jwt.sign({ adminMail }, process.env.JWT_SECRET_KEY, {
          expiresIn: 864000,
        });
       

        await Wallet.create({
          name: "Admin",
        });
        res.status(200).json({ status: true, token: token, message: "login success" });
      } else {
        res.status(200).json({ status: false, message: "admin password is incorrect" });
      }
    } else {
      res.status(200).json({ status: false, message: "admin email is incorrect" });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const add_teachers = async (req, res) => {
  try {
   

    const data = req.body.formValues;
    console.log(data);
    const teachers = await teacherDb
      .create(data)
      .then(() => {
        
        res.status(200).json({ status: true });
      })
      .catch((err) => {
        res.status(200).json({ status: false, message: err });
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const get_teachers = async (req, res) => {
  try {
   
    await teacherDb
      .find({})
      .then((data) => {
        res.status(200).json({ status: true, data });
      })
      .catch((err) => {
        res.status(200).json({ status: false, message: "error occured" });
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const upload_class = async (req, res) => {
  try {
    
    thumbsupply
      .generateThumbnail(req.file.path, {
        size: thumbsupply.ThumbSize.LARGE, // or ThumbSize.LARGE
        timestamp: `5`, // or `30` for 30 seconds
        forceCreate: true,
        cacheDir: "./media/thumbnails",
        mimetype: "video/mp4",
      })
      .then((data) => {
        console.log(data);
        let path = data.substring(5);
        path = path.replace(/\\/g, "/");
        let videoPath = req.file.path;
        videoPath = videoPath.substring(5).replace(/\\/g, "/");
        videoDb
          .create({
            description: req.body.description,
            class: req.body.class,
            subject: req.body.subject,
            video_path: `https://e-learn-34bt.onrender.com${videoPath}`,
            thumbnail_path: `https://e-learn-34bt.onrender.com${path}`,
          })
          .then((data) => {
            res.status(200).json({ status: true, message: "Successfully added" });
          })
          .catch((err) => {
            res.status(200).json({ status: false, message: "Somthing wrong" });
          });
      });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }

  //
};

const add_subject = async (req, res) => {
  await subjectDb
    .create({
      subject: req.body.subject,
      Class: req.body.checkedValues,
    })
    .then((data) => {
      console.log(data);
      res.status(200).json({ status: true, result: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_wallet = async (req, res) => {
  await Wallet.findOne({ name: "Admin" }).then((data) => {
    res.status(200).json({ result: data });
  });
};

const get_transactions = async (req, res) => {
  await Transaction.find({ to: "Admin" })
    .populate("from", "name image")
    .populate("teacher")
    .sort({ createdAt: -1 })
    .then((data) => {
      console.log(data);
      res.status(200).json({ result: data });
    });
};

const share_profit = async (req, res) => {
  const { amount, teacherId, transaction_id } = req.body;

  try {
    console.log(req.body);
    await Transaction.create({
      amount: amount,
      from: "Admin",
      to: teacherId,
      teacher: teacherId,
      shareProfit: true,
    }).then(async (data) => {
      await Transaction.findByIdAndUpdate(transaction_id, {
        shareProfit: true,
      });
      await teacherDb.findByIdAndUpdate(
        teacherId,

        { $inc: { wallet: amount } }
      );
      await Wallet.findOneAndUpdate(
        { name: "Admin" },
        { $inc: { balance: -amount } }
      );

      res.status(200).json({ status: true });
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const get_subject = async (req, res) => {
  await subjectDb.find({}).then((data) => {
    res.status(200).json({ result: data });
  });
};

const monthlylineChart = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const date = new Date(startDate);

    date.setDate(date.getDate() + 1);

    let start_date = new Date(new Date(date).setUTCHours(0, 0, 0, 0));
    let end_date = new Date(new Date(endDate).setUTCHours(23, 59, 59, 999));

    const monthlyReports = await orderDb.aggregate([
      {
        $match: {
          createdAt: { $lt: end_date, $gt: start_date },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalprice: { $sum: "$amount" },
          slots: { $sum: { $size: "$slot" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": -1 } },
    ]);

    

    let totalBooking = [];
    let bookingProfit = [];
    let bookingCount = [];
    let months = [];
    for (let i = 0; i < monthlyReports.length; i++) {
      totalBooking.unshift(monthlyReports[i].totalprice);
      bookingCount.unshift(monthlyReports[i].count);
      bookingProfit.unshift(monthlyReports[i].totalprice * (15 / 100));
      const month = new Date(
        2023,
        monthlyReports[i]._id.month - 1,
        1
      ).toLocaleString("default", { month: "long" });
      months.unshift(month);
    }

    res.status(200).json({
      status: true,
      totalBooking,
      bookingProfit,
      bookingCount,
      months,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
    error.admin = true;
  }
};
const dailyReport = async (req, res) => {
  try {

   

    const {selectedDate}=req.query
    let date = new Date(selectedDate);
    let startDate = new Date(date.setUTCHours(0, 0, 0, 0));
    let endDate = new Date(date.setUTCHours(23, 59, 59, 999));

    const todayBooking = await orderDb.aggregate([
      {
        $match: {
          payment_status: { $eq: "Success" },
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
    if (todayBooking.length !== 0) {
      const totalAmount = todayBooking[0].todayTotal;
      const totalOrder = todayBooking[0].count;
      const totalSlot = todayBooking[0].slots;

      res.status(200).json({ status: true, totalAmount, totalOrder, totalSlot });
    } else {
      res.status(200).json({ status: true, totalAmount: 0, totalOrder: 0, totalSlot: 0 });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const pieChart = async (req, res) => {
  try {
    const result = await orderDb.aggregate([
      { $unwind: "$slot" },
      {
        $group: {
          _id: "$slot.booking_status",
          count: { $sum: 1 },
        },
      },
    ]);

  
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export {
  login,
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
};
