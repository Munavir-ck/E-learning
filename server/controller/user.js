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

const signup = async (req, res) => {
  try {
    console.log(1111111111);
    console.log(req.body);
    const { name, password, email, phone, Class } = req.body;
    const user = await userDb.findOne({ email: email });

    if (user) {
      console.log(user);
      console.log(3333333);
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
          password: hashPassword,
        })
        .then((data) => {
          console.log(data);
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
    console.log(4444444444);
    console.log(req.body);
    const { email, password } = req.body.formValues;
    console.log(email);
    const user = await userDb.findOne({ email: email });
    const check = await userDb.find({});
    console.log(check);
    if (user) {
      console.log(77777777777777);
      const isMatch = await bcrypt.compare(password, user.password);
      if (user.email === email && isMatch) {
        console.log(6666666666666);
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
    console.log(1111111111);
    const classes = await classDb.find({});
    res.json({ classes });
  } catch (error) {
    console.log(error);
  }
};

const googleAthentication = async (req, res) => {
  try {
    console.log(111111111111111111);
    console.log(req.profile, 111111111);

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
  console.log(req.body.number);

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
    await teacherDb
      .find({})
      .then((data) => {
        console.log(data);
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
    console.log(req.body.searchData);
    const result = [];
    const data = req.body.searchData;

    console.log(data, 88);
    const regex = new RegExp("^" + data + ".*", "i");
    const search = await classDb.aggregate([
      {
        $match: { $or: [{ title: regex }, { class: regex }] },
      },
    ]);
    console.log(search, 444444);
    for (let i = 0; i < search.length; i++) {
      result.push(search[i]);
    }
    if (result.length === 0) {
      res.json({ status: false, message: "No results" });
    } else {
      console.log(result, 11);

      res.json({ status: true, result });
    }
  } catch (error) {
    console.log(error);
  }
};

const search_teacher = async (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body.searchData);
    const result = [];
    const data = req.body.searchData;

    console.log(data, 88);
    const regex = new RegExp("^" + data + ".*", "i");
    const search = await teacherDb.aggregate([
      {
        $match: { $or: [{ name: regex }, { subject: regex }] },
      },
    ]);
    console.log(search, 444444);
    for (let i = 0; i < search.length; i++) {
      result.push(search[i]);
    }
    if (result.length === 0) {
      res.json({ status: false, message: "No results" });
    } else {
      console.log(result, 11);

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

const get_subject = async (req, res) => {
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
    console.log(222222222222);

    const profile = "my-profile-folder";
    const { imgBase } = req.body;
    const userID = req.userId;
    console.log(userID, 3333333333);
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
  console.log(3333333);
  console.log(req.query);

  const teacherID = req.query.id;

  await teacherDb
    .findOne({ _id: teacherID })
    .then((data) => {
      console.log(data);

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
    const teacherID = req.body.id;
    const dateTostring = req.body.selectedDate;
    if (dateTostring) {
      const date = new Date(dateTostring);

      const utcDate = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
      );
      console.log(teacherID, 11);

      await teacherDb
        .findOne(
          { _id: teacherID, "slot.date": utcDate },
          { "slot.$": 1, _id: 0 }
        )
        .then((data) => {
          res.json({ status: true, result: data });
        })
        .catch((error) => {
          console.log(error);
          res.json({ status: false });
        });
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
    const data = req.body;

    await orderDb.create(data).then((data) => {
      console.log(data);
      res.json({ status: true, result: data });
    });
  } catch (error) {
    console.log(error);
  }
};

const order_success = async (req, res) => {
  try {

    console.log(req.body);
    const { order,id ,slot} = req.body;
    await orderDb.findOneAndUpdate(
      { order },
      {
        order_status: "success",

        payment_status: "success",
      }
    ).then((data)=>{

      res.json({status:true,result:data})
    }).catch((err)=>{
      console.log(err);
    })

    
    await teacherDb.findOneAndUpdate({_id:id }, 
    {$pullAll:{slot:[{_id:id}]}}).then((data)=>{
      console.log(data);
    })
  } catch (error) {
    console.log(error);
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
  get_subject,
  get_profile,
  edit_profile_image,
  get_teacherDetais,
  reservation_page,
  filter_slot,
  get_slots_user,
  creat_booking,
  order_success,
};
