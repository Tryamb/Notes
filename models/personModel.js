import mongoose from "mongoose";

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    }
});
const personModel= mongoose.model("Person",personSchema);
export default personModel