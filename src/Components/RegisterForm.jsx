import React,{useState,useContext} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { BookingContext } from '../context/BookingContext';


const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  phonenumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('Required')
});

const defaultformState = {
  name: '',
  email: '',
  phonenumber: '',
  password: ''
};

const RegisterForm = () => {
  // const { login } = useAuth();
  const [formState, setFormState] = React.useState(defaultformState);
  const navigate = useNavigate();
  const { loginsnackbar, setloginsnackbar } = useContext(BookingContext);
  const gotohome=()=>{
    navigate('/')
}

// const handleValidation=()=>{
//   const { password, email,name, phonenumber } = formState;
//   if (
//     password.length &&
//     email.length &&
//     name.length &&
//     phonenumber.length
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// };


  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("https://airbnb-clone-58y7.onrender.com/register", values);
      // console.log("The values is",values)
      // console.log('Registration successful', response.data);
        console.log(response,"signup response")
      if(response.data!==null){
        localStorage.setItem("username", response.data);
        setloginsnackbar({
          open:true,
          message:"Signup Success",
          type:"success"
        });
        navigate("/");
      }
      // Handle successful registration, e.g., show a message or redirect
    } catch (error) {
      console.error('Registration failed', error);
      setloginsnackbar({
        open:true,
        message:"Signup Failed, Check if you have entered all details correctly",
        type:"error"
      })
      navigate("/");
      // Handle registration failure, e.g., show an error message
    }
}

  return (
    <div>
      <div className='close-div'>
      <h1>Sign Up</h1>
            <i className="bi bi-x-circle close-icon" onClick={gotohome}></i>
  
      </div>
    <Formik
      initialValues={formState}
      validationSchema={RegisterSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <p className='register-text'>Enter name</p>
            <Field
              className='register-form'
              name="name"
              type="text"
              placeholder="Name"
            />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </div>
          <div>
            <p className='register-text'>Enter email</p>
            <Field
              className='register-form'
              name="email"
              type="email"
              placeholder="Email"
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>
          <div>
            <p className='register-text'>Enter phone number</p>
            <Field
              className='register-form'
              name="phonenumber"
              type="text"
              placeholder="Phone Number"
            />
            {errors.phonenumber && touched.phonenumber ? <div>{errors.phonenumber}</div> : null}
          </div>
          <div>
            <p className='register-text'>Enter password</p>
            <Field
              className='register-form'
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
          </div>
          <div className='register-btns'>
            <button className='register-btn' type='submit'>Signup</button>
          </div>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default RegisterForm;
