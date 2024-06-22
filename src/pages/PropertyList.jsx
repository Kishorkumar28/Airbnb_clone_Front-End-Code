import {React,useEffect,useState,useContext} from 'react';
// import PropertyCard from './property_component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios'
import { BookingContext } from '../context/BookingContext';
import { useNavigate } from "react-router-dom";
import Loading from './Loading';

const properties2 = [
          
  {
    "id": "852223931024",
    "name": "Sunnyvale Heights",
    "area": "Westchester County",
    "address": "6 Garth rd, Scarsdale, NY 10583",
    "city": "Scarsdale",
    "image": "9.jpg",
    "type": "Duplex",
    "floorspace": 1264,
    "beds": 3,
    "baths": 2,
    "price": 6950,
    "parking": "Available",
    "construction": ["Fireplace", "laundry", "Semi-Kitchen"],
    "country": "America",
    "filter":["duplex"],
    "rating":5,

  },
  {
    "id": "852223931025",
    "name": "Studio Properties",
    "area": "Westchester County",
    "address": "6 Garth rd, Scarsdale, NY 10583",
    "city": "Scarsdale",
    "image": "11.jpg",
    "type": "Amazingpools",
    "floorspace": 1264,
    "beds": 3,
    "baths": 1,
    "price": 12950,
    "parking": "Available",
    "construction": ["Fireplace", "laundry"],
    "country": "America",
    "filter":["amazingpools","beachfront"],
    "rating":5,

  },

  {
    "id": "651263730501",
    "name": "Pinecrest Manor",
    "area": "Westchester County",
    "address": "39 Sterling ave, White Plains, NY 10606",
    "city": "White Plains",
    "image": "4.jpg",
    "type": "Condo",
    "floorspace": 768,
    "beds": 2,
    "baths": 2,
    "price": 4450,
    "parking": "Available",
    "construction": ["elevator", "garage"],
    "country": "Canada",
    "filter":["Condo"],
    "rating":4,

  },
  {
    "id": "3511539610225",
    "name": "Riverside Retreat",
    "area": "Westchester County",
    "address": "62 Highland St, Eastchester, NY 10608",
    "city": "Eastchester",
    "image": "3.jpg",
    "type": "Multifamily",
    "floorspace": 1264,
    "beds": 4,
    "baths": "Not Available",
    "price": 5250,
    "parking": 0,
    "construction": ["basement", "laundry"],
    "country": "UK",
    "filter":["multifamily","duplex"],
    "rating":4,
  },

  {
    "id": "2511639410001",
    "name": "Maplewood Estates",
    "area": "Westchester County",
    "address": "33 Alden Pl, Bronxville, NY 10708",
    "city": "Bronxville",
    "image": "2.jpg",
    "type": "Townhouse",
    "floorspace": 1074,
    "beds": 3,
    "baths": 1,
    "price": 6650,
    "parking": "Available",
    "construction": ["Fireplace", "gym"],
    "country": "Australia",
    "filter":["Townhouse","duplex"],
    "rating":5,

  },
  {
    "id": "2411639439991",
    "name": "Hill Heights",
    "area": "Oceanview Terrace",
    "address": "261 California rd, Mamaroneck, NY 10612",
    "city": "Mamaroneck",
    "image": "5.jpg",
    "type": "Studio",
    "floorspace": 700,
    "beds": 1,
    "baths": 1,
    "price": 6650,
    "parking": "Available",
    "construction": ["laundry", "gym"],
    "country": "New Zealand",
    "filter":["Studio"],
    "rating":5,

  },
  
  {
    "id": "1522639490009",
    "name": "Willowbrook Residence",
    "area": "Westchester County",
    "address": "23 Isle Lane, New Rochelle, NY 10538",
    "city": "New Rochelle",
    "image": "6.jpg",
    "type": "Multi Family",
    "floorspace": 1630,
    "beds": 3,
    "baths": 2,
    "price": 3650,
    "parking": "Available",
    "construction": ["basement", "Fireplace"],
    "country": "Germany",
    "filter":["MultiFamily"],
    "rating":3,

  },
  {
    "id": "19639490088",
    "name": "Highland Park Villa",
    "area": "Westchester County",
    "address": "95 Vernon ave, Scarsdale, NY 10538",
    "city": "Scarsdale",
    "image": "7.jpg",
    "type": "Studio",
    "floorspace": 1200,
    "beds": 1,
    "baths": 1,
    "price": 2150,
    "parking": "Not Available",
    "construction": ["elevator", "garage"],
    "country": "France",
    "filter":["Studio","duplex"],
    "rating":3.5,

  },
  {
    "id": "1122459390065",
    "name": "Cedar Grove Cottage",
    "area": "Westchester County",
    "address": "321 Munday Lane, Eastchester, NY 10606",
    "city": "Eastchester",
    "image": "8.jpg",
    "type": "Luxe",
    "floorspace": 2100,
    "beds": 3,
    "baths": 1,
    "price": 8450,
    "parking": "Available",
    "construction": ["basement", "pool"],
    "country": "Italy",
    "filter":["luxe","duplex"],
    "rating":5,

  }

  ,{
    "id": "1722679430009",
    "name": "Lakeside Lodge",
    "area": "Westchester County",
    "address": "123 Ducksworth Way, New Rochelle, NY 10535",
    "city": "New Rochelle",
    "image": "1.jpg",
    "type": "Beachfront ",
    "floorspace": 2300,
    "beds": 2,
    "baths": 1,
    "price": 6500,
    "parking": "Available",
    "construction": ["garage", "laundry"],
    "country": "Japan",
    "filter":["beachfront","duplex"],
    "rating":5,
  }

]



        
function PropertyList() {
  const { country } = useParams('/country');
  const { searchedhotel, setsearchedhotel } = useContext(BookingContext);
  const { loginsnackbar, setloginsnackbar } = useContext(BookingContext);
  const { tags, setTags } = useContext(BookingContext);
  const { counts, setCounts } = useContext(BookingContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/${country}`); 
  }, [country]);
  const [hotelid,setHotelid]=useState("")
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [rating, setRating] = useState(0);
  const {isLoading,setIsLoading}=useContext(BookingContext);
    const {data,setData}=useContext(BookingContext);
  
  const handleClick = (property) => {
    setSelectedProperty(property);
    setRating(property.rating);
    setHotelid(property.id)
  };
  const username = localStorage.getItem("username");

  const makebooking= async ()=>{
      // console.log(counts,"adults")
      if (hotelid && username && counts.adults>=0 && counts.checkindate.length && counts.checkoutdate.length && counts.children>=0 && counts.infants>=0 && counts.pets>=0 && counts.selectedCountry.length){
        setIsLoading(true);
        try{
        setTimeout(async () => {
        const response = await axios.post('https://airbnb-clone-58y7.onrender.com/createBooking',{
          hotelid,
          username,
          ...counts,

        })

        if(response.data!==null ){
          alert("Booking created Successfully");
          navigate("/");
          setloginsnackbar({
            open:true,
            message:"Booking Successful",
            type:"success"
          });
          
          navigate("/");
        }
        setIsLoading(false); // Set loading to false after fetching data
            }, 1000);
          }
        catch{
          alert("Enter all the booking details properly");
          setloginsnackbar({
            open:true,
            message:"Booking Failed, Make sure to fill all details before booking",
            type:"error"
          });
          
          navigate("/");
          
        }
      }
  else{
    alert("Enter all the booking details properly");
    setloginsnackbar({
      open:true,
      message:"Booking Failed, Make sure to fill all details before booking",
      type:"error"
    });
    
    navigate("/");
  }
    
  }
  let filteredData=properties2;

  if (typeof searchedhotel === 'string' && searchedhotel.length > 0) {
    
      
      if(searchedhotel?.length){
        filteredData = filteredData.filter((ele) => {
            if( ele.name.toLowerCase().includes(searchedhotel?.toLowerCase())){
              return true
            }
            else{
              return false
            }
        })
      }
}

if(tags?.length){
  filteredData = filteredData.filter((ele) => {

    let filterfound =true
      ele.filter.forEach(filtertag=>{
        if(tags.includes(filtertag)){
          filterfound=false
          return true
        }
      })
      return !filterfound
  })
}
  // console.log(filteredData,"filtered data")
//   filtereddata=filtereddata.filter((ele)=>{
//     console.log("filter working")
//   if(ele?.name.toLowerCase().includes(searchedhotel?.toLowerCase())){
//     console.log(ele);
//     return true
//   }
//   {
//     return false
//   }
// })
  // if(searchedhotel?.length){
  
  // }
  
  // const handleRating = (index,rating) => {
  //   console.log(index);
  //   console.log(rating);
  //   if (rating === index) {
  //     setRating(1); // Toggle off if the same star is clicked again
  //   } else {
  //     console.log("trying")
  //     setRating(index); // Set the new rating
  //   }
  // };
  return (
    
    <div className="containers">
      {filteredData
        .filter(property => 
          (!country || (property.country.toLowerCase().includes(country.toLowerCase()))) 
        )
        ?.map((property) => (
                <div  key={property.id}  >
                  
                  <div style={{cursor:'pointer'}}  className='cards' onClick={()=>{  handleClick(property)  }}>
                  <div className='img-container'>
                      <img className='card-img ' src={`/images/property/${property.image}`} alt={property.name}></img>
                  </div>

                  <div className='info'>
                      <p className='card-name shimmer-text'>{property.name}</p>
                      <p className='grey' style={{fontWeight:"650"}}>City: {property.city}</p>
                      <p className='grey' style={{fontWeight:"700"}}>{property.price} Per Night</p>
                  </div>
              </div>
              {selectedProperty && (

                    <div className="centered-box">
                      <div className='booking-information'>
                      <div className='booking-closebtn'>
                        
                        <i className="bi bi-x-circle mybooking-close-icon" onClick={() => setSelectedProperty(null)} ></i>
                    </div>
                          <div className='booking-info-1'>

                                <div className='booking-info-left'>
                                    <img className='card-img' src={`/images/property/${selectedProperty.image}`}></img>
                                    <h2 className='booking-info-name'>Property : {selectedProperty.name}</h2>
                                    <p style={{fontWeight:500}}>Address : {selectedProperty.address}, {selectedProperty.country}</p>
                                    <p style={{fontWeight:500}}>City : {selectedProperty.city}</p>
                                    <p style={{fontWeight:500}}>Type : {selectedProperty.type}</p>
                                    <p style={{fontWeight:500}}>Parking : {selectedProperty.parking} </p>
                                    <h2 style={{marginTop:"3vh",fontWeight:500}}>Rated by our Guests</h2>
                                    <div className='star-rating'>
                                    
                                        {[...Array(5)].map((star, index) => {
                                          index += 1;
                                          return (
                                            <button
                                              type="button"
                                              key={index}
                                              className={index <= selectedProperty.rating ? 'on' : 'off'}
                                            >
                                              
                                              <span className="star">&#9733;</span>
                                            </button>
                                          );
                                        })}
                                      </div>

                                    <div style={{marginTop:"3vh"}} className='booking-room-info'>
                                      <h2 style={{fontWeight:500}}>Room info</h2>
                                      <p style={{fontWeight:500}}>Floorspace : {selectedProperty.floorspace} Sq.ft</p>
                                      <p style={{fontWeight:500}}>No of Beds : {selectedProperty.beds}</p>
                                      <p style={{fontWeight:500}}>No of Baths : {selectedProperty.baths} </p>
                                      <p style={{fontWeight:500}}>Construction : {selectedProperty.construction.join(", ")}</p>
                                    </div>
                                  </div>
                                
                                <div className='booking-info-right' >
                                  
                                  <div className='booking-info-right-bottom'>
                                  <button className='booking-button' onClick={makebooking}  >Book Now</button>
                                  </div>
                                </div>

                          </div>
                        
                          </div>
                    </div>
      )}
              
                </div>
            
        ))
      }
    </div>
    
  );
}

export default PropertyList;
