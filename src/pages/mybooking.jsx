import React, { useEffect, useState, useContext,useRef } from 'react';
import { BookingContext } from '../context/BookingContext';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function Mybooking(){
    const navigate=useNavigate()
    const { visibility, setvisibility } = useContext(BookingContext);  
    const username = localStorage.getItem("username");
    const prevVisibilityRef = useRef();
    const { loginsnackbar, setloginsnackbar } = useContext(BookingContext);
    const { open, setOpen } = useContext(BookingContext);
    const [mybookingdata,setmybookingdata]=useState([])

    const fetchMyBooking = async ()=>{
       const response = await axios.get('https://airbnb-clone-58y7.onrender.com/mybooking?username='+username);

       if(response.data!=="Error fetching data from server"){
       setmybookingdata(response?.data)
       }
      }

      useEffect(() => {
        if (prevVisibilityRef.current === false && visibility === true) {
            fetchMyBooking();
        }
        prevVisibilityRef.current = visibility;
    }, [visibility]);

    const handlecancel= async (selectedhotel,boookingid)=>{
        const response =await axios.post("https://airbnb-clone-58y7.onrender.com/cancelbooking",{
            selectedhotel:selectedhotel,
            username:username,
            bookingid:boookingid
        })

        if(response.data==="Cancelled Successfully"){
            setloginsnackbar({
                message:"Booking Cancelled Successfully",
                type:"success"
              })
              
              navigate("/");

          }
          else{
            // alert("Cancellation failed, try again. Contact us if you need any help");
            setloginsnackbar({
                message:"Cancellation Failed, Try again",
                type:"error"
              })
          }
    }

return(
    <div >
        
        {visibility && 

                <div className='centered-box-mybooking'>
                        <div className='mybooking-heading'>
                            <h1>My Booking</h1>
                        </div>
                        
                        <div className='mybooking-closebtn'>
                        
                            <i className="bi bi-x-circle mybooking-close-icon" onClick={()=>setvisibility(!visibility)} ></i>
                        </div>
                        <div className='bookings-container'>
                    {
                        mybookingdata.map((row)=>(
                            
                            <React.Fragment  key={row._id}>
                                <div style={{ paddingTop: "3vh" , paddingBottom: "5vh"  }} className='mybooking-container'>
                                    <h3 style={{ paddingBottom: "2vh" }}>Property Id: {row.hotelid}</h3>
                                    <p style={{fontWeight:500}}>Checkin Date: {row.checkindate} </p>
                                    <p style={{fontWeight:500}}>Checkout Date: {row.checkoutdate} </p>
                                    <p style={{ paddingBottom: "3vh",fontWeight:500 }}>Selected Country: {row.selectedCountry} </p>
                                    <div className='mybooking-guests'>
                                        <h4 style={{ paddingBottom: "2vh" }}>Number of guests: {row.total} </h4>
                                        <div className='mybooking-guests'>
                                            <p>Number of Adults: {row.adults} </p>
                                            <p>Number of Children: {row.children} </p>
                                            <p>Number of Infants: {row.infants}</p>
                                            <p>Number of Pets: {row.pets} </p>
                                        </div>
                                    </div>
                                    <div>
                                        <button color='red' className='mybooking-btn' onClick={()=>handlecancel(row.hotelid,row._id)}>Cancel Booking</button>
                                    </div>
                                </div>
                                <div className='mybooking-divider'></div> {/* Divider */}
                            </React.Fragment>
                        ))
                    }
                    </div>
                </div>
                
                
        }
    </div>
)
}

export default Mybooking