import React, { useRef,useState,useEffect,useContext } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import PropertyList from './PropertyList';

import { Link,useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { BookingContext } from '../context/BookingContext';

import { useNavigate } from "react-router-dom";
import Mybooking from './mybooking';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export default function Home() {
  const navigate = useNavigate();
  // const [selectedCountry, setSelectedCountry] = useState(null);
  const { counts, setCounts } = useContext(BookingContext);
  const { visbility, setvisibility } = useContext(BookingContext);
  const { searchedhotel, setsearchedhotel } = useContext(BookingContext);
  const { tags, setTags } = useContext(BookingContext);
  const { loginsnackbar, setloginsnackbar } = useContext(BookingContext);
  const { open, setOpen } = useContext(BookingContext);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setloginsnackbar({ ...loginsnackbar, open: false });
  };
  // const [checkoutdate,setCheckoutdate]=useState(null);
  // const [counts, setCounts] = useState({
  //   adults: 0,
  //   children: 0,
  //   infants: 0,
  //   pets: 0,
  //   toalguests:0,
  //   checkindate: "",
  //   checkoutdate:"",
  //   selectedCountry:"",
  // });
  const username = localStorage.getItem("username");
  const { country } = useParams();


      const countries = [
        {  label: 'America' },
        {  label: 'Australia' },
        {  label: 'Canada' },
        {  label: 'China' },
        {  label: 'France' },
        {  label: 'Germany' },
        {  label:'UK'},
        {  label: 'India'},
        {  label:'NewZealand'},
        {  label:'Italy'},
        {  label:'Japan'}
        ];

    const filterWrapperRef = useRef(null);
  

    // const handlesearchedhotel=(e)=>{
    //   ;
      
    // }

      const incrementCount = (category, e) => {
        e.preventDefault();
        e.stopPropagation();
        setCounts((prevCounts) => ({
          ...prevCounts,
          [category]: prevCounts[category] + 1,
          toalguests:counts.totalguests+1,
          checkindate:counts.checkindate,
          checkoutdate:counts.checkoutdate,
          selectedCountry:counts.selectedCountry,
        }
    
    ));
      };
      
      const decrementCount = (category, e) => {
        e.preventDefault();
        e.stopPropagation();
        setCounts((prevCounts) => ({
          ...prevCounts,
          [category]: prevCounts[category] > 0 ? prevCounts[category] - 1 : 0,
          toalguests:counts.totalguests>0 ? counts.totalguests-1:0,
          checkindate:counts.checkindate,
          checkoutdate:counts.checkoutdate,
          selectedCountry:counts.selectedCountry,
        }));
      };
      
    const scroll = (direction) => {
      const scrollAmount = 250; // Adjust as needed

      if (filterWrapperRef.current) {
        filterWrapperRef.current.scrollLeft += direction * scrollAmount;
      }
    };


      const handleCheckInClick=(date)=>{
        const day=new Date(date).getDate();
        const month=new Date(date).getMonth()+1;
        const year=new Date(date).getFullYear();
        // console.log(day,month,year)

        setCounts({...counts,
          checkindate:`${year}-${month}-${day}`

        })
      }

      const handleCheckOutClick=(date)=>{
        const day=new Date(date).getDate();
        const month=new Date(date).getMonth()+1;
        const year=new Date(date).getFullYear();
        // console.log(day,month,year)
        setCounts({...counts,
          checkoutdate:`${year}-${month}-${day}`
        })
      }

      const gotohome=()=>{
        navigate('/');
        setTags([])
    }
    // console.log(counts,"booking state");

    const [isInputVisible, setInputVisible] = useState(false);

  const handleIconClick = () => {
    setInputVisible(true);
  };

  const handleBlur = () => {
    setInputVisible(false);
  }
  const handletags=(tag)=>{
    let tagvalues=[tag]
    setTags(tagvalues)
  }
    return (
        <div className="homeParent">
            
                <nav className="navbar navbar-expand-lg custom-navbar ">
                    <div className="container-fluid">
                        
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                            <div className="collapse navbar-collapse " id="navbarNav">

                            <div className='image-container'>
                                <a className="navbar-brand"><img className="image" src="/images/airbnb_clone_icon.jpg" alt="airbnb" onClick={gotohome}/></a>
                            </div>

                            <div className="collapse navbar-collapse nav-middle" id="navbarNav">
                                        <ul className="navbar-nav ">
                                            <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="#">Stays</a>
                                            </li>
                                            <li className="nav-item">
                                            <a className="nav-link" href="#">Experiences</a>
                                            </li>
                                            <li className="nav-item">
                                            <a className="nav-link" href="#">Online Experiences</a>
                                            </li>
                                            
                                        </ul>
                            </div>


                            <div className="nav-right">
                                {!username?.length?(
                                  <div>
                                  <button type="button" className="btn"> Your home</button>
                                  </div>
                                ):(
                                  <div>
                                  <button type="button" className="btn"> Hi {username}</button>
                                  </div>
                                )

                                }

                                <a href="#"><div className=" nav-right-items" ><i className="fa-solid fa-globe"></i></div></a>

                                <div className="dropdown nav-right-items ">
                                    <button className="btn btn-light dropdown-toggles flex-row " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    
                                        <i className="fa-solid fa-bars icon1"></i>
                                        
                                    <i className="bi bi-person-circle icon2"></i>
                                    </button>
                                    <ul className="dropdown-menu user-menu">
                                    {!username?.length ?(
                                      <>
                                              <li><Link className="dropdown-menu-item" to="/register">SignUp</Link></li>
                                              <li><Link className="dropdown-menu-item" to="/login">Login</Link></li>
                                              </>
                                    ):(<>
                                    <li><Link className="dropdown-menu-item" to="/" onClick={() => {
                                                                                                localStorage.removeItem("username");
                                                                                                window.location.reload();
                                                                                                setloginsnackbar({
                                                                                                  open:true,
                                                                                                  message:"Logged Out successfully ",
                                                                                                  type:"success"
                                                                                                })
                                                                                              }}>logout</Link></li>
                                    <li><Link className="dropdown-menu-item" onClick={()=>setvisibility(!visbility)} >My Booking</Link></li>
                                    </>)}

                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-menu-item" >Airbnb your home</a></li>
                                        <li><a className="dropdown-menu-item" >Help center</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </nav>

                <div className='booking'>
                    <div className='booking-options' >

                        <div className='booking-items-1'>
                            <p className='booking-items booking-where'>Where</p>
                            <Autocomplete
                          disablePortal
                          
                          id="combo-box-demo"
                          options={countries}
                          getOptionLabel={(option) => option.label}
                          sx={{
                            width: 200,
                            '& .MuiOutlinedInput-root': {
                              height: 50, // Custom height
                              '& fieldset': {
                                border: '0px solid #ccc', // Custom border
                              },
                              '&.Mui-focused fieldset': {
                                border: '2px solid gray', // Custom border on focus
                              },
                            },
                          }}
                          renderInput={(params) => <TextField {...params} label='Country' 
                          onSelect={(e)=>{
                            const country=e.target.value;
                            setCounts({...counts,selectedCountry:country})
                            country && navigate(`/${country.toLowerCase()}`)
                            
                          }}
                          />}
                        />
                                
                        </div>

                        <div className='booking-items-2' >
                        <p className='booking-items booking-dates'>Check In</p>
                            <p className='booking-items grey'>
                            
                                </p>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                  <DatePicker onChange={handleCheckInClick}  sx={{
                            width: 200,height:57,
                            '& .MuiOutlinedInput-root': {
                              height: 50, // Custom height
                              '& fieldset': {
                                border: '0px solid #ccc', // Custom border
                              },
                              '&.Mui-focused fieldset': {
                                border: '2px solid gray', // Custom border on focus
                              },
                              
                            },
                          }}/>
                                  
                                </DemoContainer>
                              </LocalizationProvider>

                            
                        </div>
                        
                        
                        <div className='booking-items-2'>
                        <p className='booking-items booking-dates'>Check Out</p>
                            <p className='booking-items grey'>
                            
                            </p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                  <DatePicker onChange={handleCheckOutClick}  sx={{
                            width: 200,height:57,
                            '& .MuiOutlinedInput-root': {
                              height: 50, // Custom height
                              '& fieldset': {
                                border: '0px solid #ccc', // Custom border
                              },
                              '&.Mui-focused fieldset': {
                                border: '2px solid gray', // Custom border on focus
                              },
                              
                            },
                          }}/>
                                  
                                </DemoContainer>
                              </LocalizationProvider>
                        </div>

                        <div className='booking-items-1 search-added'>
                            <div>
                            <p className='booking-items booking-guests'>Add Guests</p>
                                
                            <div className="dropdown" onClick={(e) => { e.stopPropagation()}}>
                                <button  className="btn dropdown-toggle dropdowns grey" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => {
                                      e.preventDefault(); // Prevent default behavior
                                      e.stopPropagation(); // Stop event propagation
                                      // Your click handling logic here
                                    }}>
                                {counts.adults+counts.children+counts.pets} Guests {counts.infants} Infants
                                </button>
                                <ul className="dropdown-menu custom-dropdown-menu " onClick={(e) => { e.stopPropagation()}}>
                                    <li className="dropdown-item" onClick={(e) => { e.stopPropagation()}}>    
                                                <div style={{display:"flex", flexDirection:"column", alignItems:"start",justifyContent:"center" }}>
                                                <p >Adults</p>
                                                <p className='grey'>Age 13 or above</p>
                                                </div>
                                                
                                                <div className="div-icons">
                                                    <i className="bi bi-dash-circle quantity-icons " onClick={(e) => decrementCount('adults', e)}></i>
                                                    <span id="adult">{counts.adults}</span>
                                                    <i className="bi bi-plus-circle-fill quantity-icons" onClick={(e) => incrementCount('adults', e)}></i>
                                                </div>
                                            
                                    </li>

                                    <li className="dropdown-item" onClick={(e) => { e.stopPropagation()}}>    
                                    <div style={{display:"flex", flexDirection:"column", alignItems:"start",justifyContent:"center" }}>
                                                <p >Children</p>
                                                <p className='grey'>Ages 2 to 12</p>
                                                </div>
                                                <div className="div-icons">
                                                <i className="bi bi-dash-circle quantity-icons" onClick={(e) => decrementCount('children', e)}></i>
                                                <span id="children">{counts.children}</span>
                                                <i className="bi bi-plus-circle-fill quantity-icons" onClick={(e) => incrementCount('children', e)}></i>
                                                    </div>
                                    </li>

                                    <li className="dropdown-item" onClick={(e) => { e.stopPropagation()}}>    
                                    <div style={{display:"flex", flexDirection:"column", alignItems:"start",justifyContent:"center" }}>
                                                <p >Infants</p>
                                                <p className='grey'>Under 2</p>
                                                </div>
                                                <div className="div-icons">
                                                    <i className="bi bi-dash-circle quantity-icons" onClick={(e) => decrementCount('infants', e)}></i>
                                                    <span id="infants">{counts.infants}</span>
                                                    <i className="bi bi-plus-circle-fill quantity-icons" onClick={(e) => incrementCount('infants', e)}></i>
                                                </div>
                                    </li>

                                    <li className="dropdown-item" onClick={(e) => { e.stopPropagation()}}>    
                                    <div style={{display:"flex", flexDirection:"column", alignItems:"start",justifyContent:"center" }}>
                                                <p >Pets</p>
                                                </div>
                                                <div className="div-icons">
                                                    <i className="bi bi-dash-circle quantity-icons" onClick={(e) => decrementCount('pets', e)}></i>
                                                    <span id="pets">{counts.pets}</span>
                                                    <i className="bi bi-plus-circle-fill quantity-icons" onClick={(e) => incrementCount('pets', e)}></i>
                                                </div>
                                    </li>
                                </ul>
                            </div>
                            
                            </div>

                            <div className='search-container'>
                                {isInputVisible ? (
                                  <input
                                    type="text"
                                    className="search-input"
                                    onBlur={handleBlur}
                                    onChange={(e)=>{setsearchedhotel(e.target.value)}}
                                    autoFocus
                                  />
                                ) : (
                                  <div className='search-icon' onClick={handleIconClick}>
                                    <i className="bi bi-search"></i>
                                  </div>
                                )}
                              </div>
                        </div>
                        
                    </div>
                    
                    
                </div>
                <div>
                
                        <div className="filter-container">
                        <button className='filter-btn' onClick={() => scroll(-1)}><ArrowBackIosNewIcon /></button>
                        <div className="filter-wrapper" ref={filterWrapperRef}>
                            <div className="filters">
                            
                            <span className="filter" id="duplex" onClick={(e)=>{handletags(e.target.id)}}>Duplex</span>
                            <span className="filter" id="condo" onClick={(e)=>{handletags(e.target.id)}}>Condo</span>
                            <span className="filter" id="beachfront" onClick={(e)=>{handletags(e.target.id)}}>BeachFront</span>
                            <span className="filter" id="singlefamily" onClick={(e)=>{handletags(e.target.id)}}>Single Family</span>
                            <span className="filter" id="amazingpools" onClick={(e)=>{handletags(e.target.id)}}>Amazing pools</span>
                            <span className="filter" id="townhouse" onClick={(e)=>{handletags(e.target.id)}}>Townhouse</span>
                            <span className="filter" id="studio" onClick={(e)=>{handletags(e.target.id)}}>cabins</span>
                            <span className="filter" id="multifamily" onClick={(e)=>{handletags(e.target.id)}}>Multi Family</span>
                            <span className="filter" id="treehouses" onClick={(e)=>{handletags(e.target.id)}}>Treehouses</span>
                            <span className="filter" id="tinyhomes" onClick={(e)=>{handletags(e.target.id)}}>Tiny homes</span>
                            <span className="filter" id='farms' onClick={(e)=>{handletags(e.target.id)}}>Farms</span>
                            <span className="filter" id="lakefront" onClick={(e)=>{handletags(e.target.id)}}>Lakefront</span>
                            <span className="filter" id='luxe' onClick={(e)=>{handletags(e.target.id)}}>Luxe</span>
                            <span className="filter" id="mountains" onClick={(e)=>{handletags(e.target.id)}}>Mountains</span>
                            <span className="filter" id='earthhomes' onClick={(e)=>{handletags(e.target.id)}}>Earth homes</span>
                            
                            </div>
                            
                        </div>
                        <button className='filter-btn' onClick={() => scroll(1)}><ArrowForwardIosIcon/></button>
                        </div>

                        
                        <PropertyList counts={counts}
                         />
                        <Mybooking/>
                        
                </div>
                
                <footer>
                <p>&copy; 2024 Hotel Booking! No rights reserved - this is a demo</p>
                <p>
                    Privacy · Terms · Sitemap · Company Details
                </p>
            </footer>
            <Snackbar open={loginsnackbar.open} autoHideDuration={5000} onClose={handleClose}>
          <Alert
            onClose={()=>{}}
            severity={loginsnackbar.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {loginsnackbar.message}
          </Alert>
        </Snackbar>        
        </div>
    );

    
}

