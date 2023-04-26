import mongoose from "mongoose";
import userDb from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import classDb from "../model/demo_class.js";
import { userData } from "../utilities/passport.js";
import { verifyotp, sendotp } from "../utilities/otp.js";
import teacherDb from "../model/teacher.js";
import subjectDb from "../model/subject.js";
import { cloudinary } from "../utilities/cloudinary.js";
import orderDb from "../model/order.js";
import messageDb from "../model/chat.js";
import reviewDb from "../model/review.js";
import Transaction from "../model/transaction.js";
import Wallet from "../model/wallet.js";

const signup = async (req, res) => {
  try {
    const { name, password, email, phone, Class, address, city } = req.body;
    const user = await userDb.findOne({ email: email });

    if (user) {
      res.json({ status: false, message: "email already exist" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password.trim(), salt);

      await userDb
        .create({
          name,
          email,
          phone,
          Class,
          address,
          city,
          password: hashPassword,
        })
        .then((data) => {
          res.json({ status: true, message: "email already exist" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body.formValues;

    const user = await userDb.findOne({ email: email });
    const check = await userDb.find({});

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (user.email === email && isMatch) {
        const ID = user._id;
        const token = jwt.sign({ ID }, process.env.JWT_SECRET_KEY, {
          expiresIn: 3000,
        });
        res.json({
          status: true,
          token: token,
          result: user,
          message: "login success",
        });
      } else {
        res.json({ status: false, message: "User password is incorrect" });
      }
    } else {
      res.json({ status: false, message: "User email is incorrect" });
    }
  } catch (error) {
    console.log(error);
  }
};

const get_classes = async (req, res) => {
  try {
    const classes = await classDb.find({});
    res.json({ classes });
  } catch (error) {
    console.log(error);
  }
};

const googleAthentication = async (req, res) => {
  try {
    const userId = userData._id;

    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: 3000,
    });
    res.json({
      status: true,
      token: token,
      userData,
      message: "login success",
    });
  } catch (error) {
    console.log(error);
  }
};

const get_otp = (req, res) => {
  console.log(22222);
  sendotp(req.body.number);
};
const verify_otp = (req, res) => {
  try {
    console.log(req.body);
    const { storeOTP, number } = req.body;
    console.log(number, "my number");
    if (storeOTP.length === 6) {
      verifyotp(number, storeOTP).then((verification_check) => {
        if (verification_check.status == "approved") {
          res.json({ status: true, message: "success" });
        } else if (verification_check.status == "pending") {
          res.json({ status: false, message: "Incorrect OTP" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const get_teachers = async (req, res) => {
  try {
    console.log(12121211212);
    await teacherDb
      .find({})
      .then((data) => {
        res.json({ status: true, data });
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: false, data });
      });
  } catch (error) {
    console.log(error);
  }
};

const search_class = async (req, res) => {
  try {
    const result = [];
    const data = req.body.searchData;

    const regex = new RegExp("^" + data + ".*", "i");
    const search = await classDb.aggregate([
      {
        $match: { $or: [{ subject: regex }, { class: regex }] },
      },
    ]);

    for (let i = 0; i < search.length; i++) {
      result.push(search[i]);
    }
    if (result.length === 0) {
      res.json({ status: false, message: "No results" });
    } else {
      res.json({ status: true, result });
    }
  } catch (error) {
    console.log(error);
  }
};

const search_teacher = async (req, res) => {
  console.log(req.body);
  try {
    const result = [];
    const data = req.body.searchData;

    const regex = new RegExp("^" + data + ".*", "i");
    const search = await teacherDb.aggregate([
      {
        $match: { $or: [{ name: regex }, { subject: regex }] },
      },
    ]);

    for (let i = 0; i < search.length; i++) {
      result.push(search[i]);
    }
    if (result.length === 0) {
      res.json({ status: false, message: "No results" });
    } else {
      res.json({ status: true, result });
    }
  } catch (error) {
    console.log(error);
  }
};

const filter_teachers = async (req, res) => {
  let studentClass;
  const ID = req.query.student_id;
  const checkedValues = req.query.checkedValues;

  await userDb
    .findOne({ _id: ID })
    .then((data) => {
      studentClass = data.Class;
    })
    .catch((err) => {
      console.log(err);
    });

  if (checkedValues) {
    await teacherDb
      .aggregate([
        {
          $match: {
            class: studentClass,
            subject: { $in: checkedValues },
          },
        },
      ])
      .then((data) => {
        if (data.length === 0) {
          console.log("No users c");
          res.json({ status: false, message: "No available teachers" });
        } else {
          res.json({ status: true, result: data });
        }
      });
  } else {
    await teacherDb
      .aggregate([{ $match: { class: studentClass } }])
      .then((data) => {
        if (data.length === 0) {
          console.log("No users");
          res.json({ status: false, message: "No available teachers" });
        } else {
          res.json({ status: true, result: data });
        }
      });
  }
};

const get_filtred_subject = async (req, res) => {
  let studentClass;
  const ID = req.query.student_id;

  await userDb
    .findOne({ _id: ID })
    .then((data) => {
      studentClass = data.Class;
    })
    .catch((err) => {
      console.log(err);
    });
  await subjectDb
    .aggregate([
      {
        $match: {
          Class: { $in: [studentClass] },
        },
      },
    ])
    .then((data) => {
      if (data.length === 0) {
        console.log("No users");
        res.json({ status: false, message: "No available teachers" });
      } else {
        res.json({ status: true, result: data });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_profile = async (req, res) => {
  const userID = req.userId;
  await userDb
    .findOne({ _id: userID })
    .then((data) => {
      res.json({ status: true, result: data });
    })
    .catch((err) => {
      res.json({ status: false });
      console.log(err);
    });
};

const edit_profile_image = async (req, res) => {
  try {
    const profile = "my-profile-folder";
    const { imgBase } = req.body;
    const userID = req.userId;

    const result = await cloudinary.uploader
      .upload(imgBase, {
        folder: profile,
      })
      .catch((err) => {
        console.log(err);
      });

    await userDb
      .findOneAndUpdate({ _id: userID }, { image: result.secure_url })
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

const get_teacherDetais = async (req, res) => {
  const teacherID = req.query.id;

  await teacherDb
    .findOne({ _id: teacherID })
    .then((data) => {
      res.json({ status: true, result: data });
    })
    .catch((err) => {
      res.json({ status: false });
      console.log(err);
    });
};

const reservation_page = async (req, res) => {
  const teacherId = req.query.id;

  await teacherDb
    .findOne({ _id: teacherId })
    .then((data) => {
      res.json({ status: true, result: data });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: false, message: "error" });
    });
};

const filter_slot = async (req, res) => {
  try {
    const teacherID = new mongoose.Types.ObjectId(req.body.id);
    const dateTostring = req.body.selectedDate;

    console.log(dateTostring);
    if (dateTostring) {
      const date = new Date(dateTostring);

      const utcDate = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
      );

      const data = await teacherDb.aggregate([
        { $match: { _id: teacherID, "slot.date": utcDate } },
        {
          $project: {
            slots: {
              $filter: {
                input: "$slot",
                as: "s",
                cond: { $eq: ["$$s.date", utcDate] },
              },
            },
          },
        },
      ]);

      if (data.length === 0) {
        res.json({ status: false });
      } else {
        res.json({ status: true, result: data });
        console.log(data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const get_slots_user = async (req, res) => {
  const ID = req.query.id;

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

const creat_booking = async (req, res) => {
  try {
    const { student, slot, amount, teacher, order_id } = req.body;

    const slotId = slot;

    const ID = teacher;
    const result = await teacherDb.findOne({ _id: ID }, { slot: 1, _id: 0 });

    const filteredResult = result.slot.filter((obj) => {
      return slotId.includes(obj._id.toString());
    });
    const count = filteredResult.length;
    const totalAmount = amount * count;
    await orderDb
      .create({
        student,
        slot: filteredResult,
        amount: totalAmount,
        teacher,
        order_id,
      })
      .then(async (data) => {
        await teacherDb.updateOne(
          { _id: teacher, "slot._id": { $in: slot } },
          { $set: { "slot.$.booking_status": "boocked" } }
        );

        await Transaction.create({
          description: "Booking payment",
          amount: amount,
          from: student,
          to: "Admin",
          teacher: teacher,
        }).then(async (data) => {
          await Wallet.findOneAndUpdate(
            { name: "Admin" },

            { $inc: { balance: amount }, $push: { transactions: data._id } }
          );
        });

        res.json({ status: true, result: data });
      });
  } catch (error) {
    console.log(error);
  }
};

const order_success = async (req, res) => {
  try {
    const { order, id, slot } = req.body;
    await orderDb
      .findOneAndUpdate(
        { order },
        {
          order_status: "success",

          payment_status: "success",
        }
      )
      .then((data) => {
        res.json({ status: true, result: data });
      })
      .catch((err) => {
        console.log(err);
      });

    await teacherDb
      .findOneAndUpdate({ _id: id }, { $pullAll: { slot: [{ _id: id }] } })
      .then((data) => {});
  } catch (error) {
    console.log(error);
  }
};

const get_bookings = async (req, res) => {
  try {
    const ID = req.userId;
    const teacherId = new mongoose.Types.ObjectId(ID);

    const data = await orderDb.aggregate([
      {
        $match: { student: teacherId },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "teacher",
          foreignField: "_id",
          as: "teacher",
        },
      },
      {
        $unwind: "$slot",
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.json({ status: true, result: data });
  } catch (error) {
    console.log(error);
  }
};

const cancel_booking = async (req, res) => {
  try {
    const { slot_id, order_id } = req.body;
    const slotid = new mongoose.Types.ObjectId(slot_id);
    const result = await orderDb.updateOne(
      { _id: order_id, "slot._id": slotid },
      { $set: { "slot.$.booking_status": "Cancelled" } }
    );

    await teacherDb.updateOne(
      { "slot._id":slot_id},
      { $set: { "slot.$.booking_status": "pending" } }
    );
    res.json({ status: true, result: result });
  } catch (error) {
    console.log(error);
  }
};
const create_chat = async (req, res) => {
  const { message, teacher } = req.body;
  console.log(req.userId);

  try {
    await messageDb
      .create({
        sender: req.userId,
        receiver: teacher,
        message: message,
      })
      .then((data) => {
        console.log(data);
        res.json({ result: data });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

const get_messages = async (req, res) => {
  console.log(req.query, 222);

  const { teacher } = req.query;
  const userId = req.userId;

  console.log(teacher, userId);
  try {
    const messagesSend = await messageDb
      .find({
        sender: userId,
        receiver: teacher,
      })
      .sort({ createdAt: -1 });
    const messageRecieved = await messageDb.find({
      sender: teacher,
      receiver: userId,
    });

    const result = messageRecieved.concat(messagesSend);

    result.sort(function (a, b) {
      return a.createdAt - b.createdAt;
    });

    res.json({ result: result });
  } catch (error) {
    console.log(error);
  }
};

const get_chat_reciever = async (req, res) => {
  console.log(req.query);
  const { teacher } = req.query;
  await teacherDb.findById(teacher).then((data) => {
    res.json({ result: data });
  });
};

const customer_review = async (req, res) => {
  try {
    let totalRatings = 0;
    const student_id = req.userId;
    const { count, review, teacher_id } = req.body;

    await reviewDb
      .create({
        rating: count,
        comment: review,
        teacher: teacher_id,
        student: student_id,
      })
      .then(async (data) => {
        console.log(data);
        const reviews = await reviewDb.find({ teacher: teacher_id });

        const count = reviews.length;
        reviews.forEach((element) => {
          totalRatings = element.rating + totalRatings;
        });

        console.log(totalRatings, "totalR");
        console.log(count, "count");

        const rating = totalRatings / count;

        await teacherDb.findOneAndUpdate(
          { _id: teacher_id },
          { rating: rating }
        );

        res.json({ status: true });
      });
  } catch (error) {
    console.log(error);
  }
};

const get_reviews = async (req, res) => {
  const { id } = req.query;
  await reviewDb
    .find({
      teacher: id,
    })
    .populate("student", "name image")
    .then((data) => {
      console.log(data);
      res.json({ result: data });
    });
};

const get_subject = async (req, res) => {
  console.log(343434343434);
  await subjectDb.find({}).then((data) => {
    console.log(data);
    res.json({ status: true, result: data });
  });
};

const filter_our_teacher = async (req, res) => {

 
  const { checkedValues } = req.body;

  let ratingArr = [];
  let subjectArr = [];
  let classesArr = [];

  if (checkedValues) {
    const ratings = checkedValues.filter(
      (item) => item.id !== "subject" && item.id !== "class"
    );

    const subjects = checkedValues.filter(
      (item) => item.id !== "rating" && item.id !== "class"
    );

    const classes = checkedValues.filter(
      (item) => item.id !== "rating" && item.id !== "subject"
    );

    ratings.map((item) => {
      const value = parseInt(item.value);
      ratingArr.push(value);
    });
    subjects.map((item) => {
      subjectArr.push(item.value);
    });

    classes.map((item) => {
      classesArr.push(item.value);
    });

    const maxRating = Math.max(...ratingArr);

   

    await teacherDb
      .aggregate([
        {
          $match: {
            $or: [
              { subject: { $in: subjectArr } },
              { class: { $in: classesArr } },
              { rating: { $in: ratingArr } },
              // { rating: { $gt: maxRating },}
            ],
          },
        },
      ])
      .then((data) => {
        console.log(data, 66666);
        res.json({ status: true, result: data });
      });
  }
};

export {
  signup,
  login,
  get_classes,
  googleAthentication,
  get_otp,
  verify_otp,
  get_teachers,
  search_class,
  search_teacher,
  filter_teachers,
  get_filtred_subject,
  get_profile,
  edit_profile_image,
  get_teacherDetais,
  reservation_page,
  filter_slot,
  get_slots_user,
  creat_booking,
  order_success,
  get_bookings,
  cancel_booking,
  create_chat,
  get_messages,
  get_chat_reciever,
  customer_review,
  get_reviews,
  get_subject,
  filter_our_teacher,
};
