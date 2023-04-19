import mongoose  from 'mongoose';

const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
   
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    default: 'paypal',
  },
 from: {
    type: String,
    ref:'user',
    required: true
  },
 to: {
    type:String,
    ref:'teacher',
    required: true
  },
  teacher:{
    type:String,
    ref:'teacher'
  },
  shareProfit:{
    type:Boolean,
    default:false
  }
},
{
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default  Transaction;
