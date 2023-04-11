import { cloudinary } from "../utilities/cloudinary.js";
import teacherDb from "../model/teacher.js";
import jwt from "jsonwebtoken";
import orderDb from "../model/order.js";

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

  try {
  

    const result = await orderDb
      .find({ teacher: ID })
      .populate("student", "name phone");

  

    let slots = [];
    result.forEach(async (element) => {
      const slotId = element.slot;
     const data= await teacherDb
        .findOne(
          { _id: ID, "slot._id": { $in: slotId } },
          { "slot.$": 1, _id: 0 }
        )
       
          console.log(data, 2222);
          if (data!= null) {
            slots.push(data);
          }
          console.log(slots,999);

        
          let slots = [];
await Promise.all(result.map(async (element) => {
  const slotId = element.slot;
  const data = await teacherDb.findOne(
    { _id: ID, "slot._id": { $in: slotId } },
    { "slot.$": 1, _id: 0 }
  );
  if (data != null) {
    slots.push(data);
  }
}));
console.log(slots, 222);

       
       
       
    });
    console.log(slots,222);
    console.log(34343434343434);
    res.json({ status: true, result: result, slots: slots });
  } catch (error) {
    console.log(error);
  }
};

export {
  edit_profile_image,
  get_profile,
  googleAuthTutor,
  create_slot,
  get_slot,
  get_bookings,
};
