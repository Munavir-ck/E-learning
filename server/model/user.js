import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
      name: {
      type: String,
      required: true,
    
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    
    },

    password: {
      type: String,
      trim: true,
      required: true,
      minlength: [6],
    },
    phone:{
      type:Number
    },
    image: {
      type: String,
     
    },
    Class:{
      type: String,
    },
    address:{
      type:String,
    },
    city:{
      type:String
    },
    isBanned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const usermodel = mongoose.model("user", userSchema);
export default  usermodel;