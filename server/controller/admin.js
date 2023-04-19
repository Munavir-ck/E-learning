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

ffmpeg.setFfmpegPath(ffmpegPath.path);
// import { spawn } from 'child_process';

// import { path as ffprobePath } from '@ffprobe-installer/ffprobe';

dotenv.config({ silent: process.env.NODE_ENV === "production" });

const login = async (req, res) => {
  try {
    const { email, password } = req.body.formValues;
    console.log(2323232323);
    const adminMail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminMail === email) {
      console.log(2323232323);
      if (adminPassword === password) {
        const token = jwt.sign({ adminMail }, process.env.JWT_SECRET_KEY, {
          expiresIn: 300,
        });
        console.log(token);

        await Wallet.create({
          name: "Admin",
        });
        res.json({ status: true, token: token, message: "login success" });
      } else {
        res.json({ status: false, message: "admin password is incorrect" });
      }
    } else {
      res.json({ status: false, message: "admin email is incorrect" });
    }
  } catch (error) {
    console.log(error);
  }
};

const add_teachers = async (req, res) => {
  try {
    console.log(req.body);

    const data = req.body.formValues;
    console.log(data);
    const teachers = await teacherDb
      .create(data)
      .then(() => {
        console.log(121212121212);
        res.json({ status: true });
      })
      .catch((err) => {
        res.json({ status: false, message: err });
      });
  } catch (error) {
    console.log(error);
  }
};

const get_teachers = async (req, res) => {
  try {
    console.log(1111111111112222);

    await teacherDb
      .find({})
      .then((data) => {
        res.json({ status: true, data });
      })
      .catch((err) => {
        res.json({ status: false, message: "error occured" });
      });
  } catch (error) {
    console.log(error);
  }
};

const upload_class = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file.path, 11111111111111);
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
            video_path: `http://localhost:${process.env.PORT}${videoPath}`,
            thumbnail_path: `http://localhost:${process.env.PORT}${path}`,
          })
          .then((data) => {
            res.json({ status: true, message: "Successfully added" });
          })
          .catch((err) => {
            res.json({ status: false, message: "Somthing wrong" });
          });
      });
  } catch (error) {
    console.log(error);
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
      res.json({ status: true, result: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_wallet = async (req, res) => {
  await Wallet.findOne({ name: "Admin" }).then((data) => {
    res.json({ result: data });
  });
};

const get_transactions = async (req, res) => {
  await Transaction.find({ to: "Admin" })
    .populate("from", "name image")
    .populate("teacher")
    .then((data) => {
      console.log(data);
      res.json({ result: data });
    });
};

const share_profit = async (req, res) => {
  const { amount, teacherId, transaction_id } = req.body;

  console.log(req.body);
  await Transaction.create({
    amount: amount,
    from: "Admin",
    to: teacherId,
    teacher:teacherId,
    shareProfit: true,
  }).then(async (data) => {
    await Transaction.findByIdAndUpdate(transaction_id, { shareProfit: true });
    await teacherDb.findByIdAndUpdate(
      teacherId,

      { $inc: { wallet: amount  } }
    );
    await Wallet.findByIdAndUpdate({name:"Admin"},
    {$inc:{balance:-amount}}
    )

    res.json({status:true})
  });

  
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
};
