import { mongoose } from "mongoose";

const subjectSchema=new mongoose.Schema(
{
    subject:{
        type:String,
    },
    Class:{
        type:Array
    }
}

)

const subjectModel=mongoose.model("subject",subjectSchema)
export default subjectModel;