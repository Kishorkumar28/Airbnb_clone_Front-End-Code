import React, { createContext, useState } from 'react';

// Create a new context
export const BookingContext = createContext();

// Create a provider component for the context
export const BookingProvider = ({ children }) => {
  // State for managing booking details
  const [counts, setCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
    toalguests: 0,
    checkindate: "",
    checkoutdate: "",
    selectedCountry: "",
  });

  const [visibility,setvisibility] = useState(false) ;
  const [searchedhotel,setsearchedhotel]=useState("");
  const [tags,setTags]=useState([]);
  const [loginsnackbar,setloginsnackbar]=useState({
    open: false,
    message:"",
    type:""
});
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState({});

const [open, setOpen] = React.useState(false);

const [filteredCountry,setfilteredCountry]=useState("")
  // Context value containing state and any necessary functions
  const contextValue = {
    counts,
    setCounts,
    visibility,
    setvisibility,
    searchedhotel,
    setsearchedhotel,
    tags,
    setTags,
    loginsnackbar,
    setloginsnackbar,
    open,
    setOpen,
    isLoading,
    setIsLoading,
    data,
    setData,
    filteredCountry,
    setfilteredCountry
  };

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider