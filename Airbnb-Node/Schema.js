import mongoose from 'mongoose'

const Schema=mongoose.Schema;

const registrationSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    
})


const registrationModel=mongoose.model('register',registrationSchema);


export default registrationModel;
