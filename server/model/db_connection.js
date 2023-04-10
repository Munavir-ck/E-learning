import mongoose from "mongoose"

mongoose.set("strictQuery", false);

const dbConnection=function (cb){
    mongoose.connect("mongodb://0.0.0.0:27017/course", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("connection success");
        cb(true)
    }).catch((err)=>{
        console.log(err);
        cb(false)
    })
    
}
export default dbConnection
