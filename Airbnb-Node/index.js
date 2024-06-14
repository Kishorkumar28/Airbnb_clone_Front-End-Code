import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import connectDb from './db.js'
import registrationModel from './Schema.js';
import BookingModel from './Schema2.js';

connectDb();

const app=express();
app.use(cors())
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.send('Server Running sucessfully');
});

app.post('/register',async (req,res)=>{
    // console.log("the ui input iss",req.body);

    const dbresponse= await registrationModel.create({
      name: req.body.name,
      email: req.body.email,
      password:  req.body.password,
      phonenumber: req.body.phonenumber,
    })
    // console.log("dbresponse: ",dbresponse)

    if(dbresponse._id){
      res.send(dbresponse.name)
    }else{
      res.status(500).send('error')
    }})



app.get('/login', async (req,res)=>{
      // console.log("the ui input is",req.body);
      // console.log("1",req.query.email);
      // console.log("2",req.query.password);

      const dbresponse = await registrationModel.findOne({
        email: req.query.email,
        password:  req.query.password,
      })
      // console.log("dbresponse: ",dbresponse)

      if(dbresponse?._id){
        res.send(dbresponse.name)
      }else{
        res.status(500).send('error')
      }

    })

    
app.post('/createBooking', async (req,res)=>{

  const{adults='',checkindate='',checkoutdate='',children='',infants='',pets='',selectedCountry='',toalguests='',hotelid='',username='',isCancelled=false}=req.body
  // console.log(req.body,"creating req body")
  // console.log(req.body.hotelid)
  // console.log(req.body.counts.checkindate)
  // console.log(req.body.counts.checkoutdate)
  // console.log(req.body.counts.children)
  // console.log(req.body.counts.infants)
  // console.log(req.body.counts.pets)
  // console.log(req.body.counts.selectedCountry)
  // console.log(req.body.counts.toalguests)
  // console.log(req.body.username)
    


  // const adults=req.body.counts.adults
  // const checkindate=req.body.counts.checkindate
  // const checkoutdate=req.body.counts.checkoutdate
  // const children=req.body.counts.children
  // const infants=req.body.counts.infants
  // const pets=req.body.counts.pets
  // const selectedCountry=req.body.counts.selectedCountry
  // const toalguests=req.body.counts.toalguests
  // const hotelid=req.body.hotelid
  // const username=req.body.username
  // const isCancelled=false
  const response = await BookingModel.create({
      adults,checkindate  ,checkoutdate  ,children  ,infants  ,pets  ,selectedCountry  ,toalguests  ,hotelid  ,username , isCancelled
  })
      if(response._id){
        res.send("Booking created Successfully")
      }
      else{
        res.send("error")
      }

} )


app.get('/mybooking', async (req,res)=>{
   const username=req?.query?.username || '';

   const response = await BookingModel.find({
    username,
    isCancelled:false
   })
   
   if (response?.length){
    res.send(response)
   }
   else{
    res.send('Error fetching data from server')
   }

})

app.post('/cancelbooking', async (req,res)=>{
  const {selectedhotel,username,bookingid} = req.body
  console.log(selectedhotel,username,bookingid)


  const filter = {
    _id: bookingid
  }
  const update={isCancelled:true}
  const response = await BookingModel.findOneAndUpdate(filter,update);
  console.log(response, "dbresponse");
  if(response?._id){
    res.send("Cancelled Successfully")
  }
  else{
    res.send("Cancellation error")
  }
})

app.listen(3000,()=>{
    console.log('listening on port 3000');
});

