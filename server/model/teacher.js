import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
  
    FEE: {
      type: Number,
    },

    subject: {
      type: String,
    },
    qualification: {},
    phone: {
      type: Number,
    },
    class: {
      type: String,
    },
    image: {
      type: String,
    },
    isBanned: { type: Boolean, default: false },
    status: {
      type: String,
    },
    Fee: {
      type: Number,
    },
    block: {
      type: Boolean,
      default: false,
    },
    wallet: {
      type:Number,
      default:0
    },
    
     rating:{
      type:Number,
      default:0,
     }
    ,
    slot: [
      {
        date: { type: Date },

        endTime: { type: String },

        startTime: { type: String },
        booking_status: {
          type: String,
          default: "pending",
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);
const teacher_model = mongoose.model("teacher", teacherSchema);
export default teacher_model;
