import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {

   student: {
    type: String,
      ref: "user"
     
    },

    teacher: {
      type: String,
      ref: 'teacher'
    },
   
    order_status: {
      type:String,
      default:'pending'
    },
    amount: {
      type: Number,
    },
    payment_status: {
      type: String,
      default:'Success'
    },
  
    order_id: {
      type: String,
      
    },
    slot:{
        type:Array,
    }
   
  },

  {
    timestamps: true,
  }
);
const order_model = mongoose.model("order",orderSchema);
export default order_model;