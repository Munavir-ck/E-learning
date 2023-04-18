import mongoose from 'mongoose'





const  messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
   
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
   
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const message = mongoose.model('message', messageSchema);
export  default  message

