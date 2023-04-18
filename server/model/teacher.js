import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      //   unique: true,
      //   lowercase: true,
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
