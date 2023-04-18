import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
     subject: {
      type: String,
      required: true,
    
    },

    video_path: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    
    },

    thumbnail_path: {
      type: String,
    
    },

    class:{
      type: String,
    },
    description:{
      
      type: String,
    }
  
  },
  {
    timestamps: true,
  }
);

const democlass = mongoose.model("democlass",  VideoSchema);
export default democlass;