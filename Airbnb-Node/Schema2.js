import mongoose from 'mongoose'

const Schema=mongoose.Schema;



const BookingSchema=new Schema({
    adults: {
        type:Number,
        required:true
    },
    checkindate:{
        type:String,
        required:true
    },
    checkoutdate:{
        type:String,
        required:true
    },
    children:{
        type:Number,
        required:true
    },
    infants:{
        type:Number,
        required:true
    },
    pets:{
        type:Number,
        required:true
    },
    selectedCountry:{
        type:String,
        required:true
    },
    toalguests:{
        type:Number,
        required:true
    },
    hotelid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    isCancelled:{
        type:Boolean,
        default:false
    },

})

const BookingModel=mongoose.model('booking',BookingSchema)

export default  BookingModel;
