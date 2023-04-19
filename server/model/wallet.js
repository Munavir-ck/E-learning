import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },

  balance: {
    type: Number,
    default: 0
  },
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }]
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default  Wallet;
