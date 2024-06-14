import {React,useState,useContext} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { BookingContext } from '../context/BookingContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required')
});

const defaultformState = {
  name: '',
  email: '',
  phonenumber: '',
  password: ''
};
const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }}
    const LoginForm = () => {
      const navigate = useNavigate();
      const [loginError, setLoginError] = useState('');

      const gotosignup=()=>{
          navigate('/register')
      }
      const gotohome=()=>{
        navigate('/')
    };

    const { loginsnackbar, setloginsnackbar } = useContext(BookingContext);

      const login = async (values) => {
        // console.log(values);
        try {
          const response = await axios.get(`https://airbnb-clone-58y7.onrender.com/login?email=${values.email}&password=${values.password}`);
          // console.log('Login successful', response.data);
          if(response.data!==null){
            localStorage.setItem("username", response.data);
            setloginsnackbar({
              open:true,
              message:"Login Success",
              type:"success"
            })
            navigate("/");
            
          }
          // Handle successful login, e.g., redirect or show a message
        } catch (error) {
          console.error('Login failed', error);
          alert('Invalid email or password. Please try again.');
          setloginsnackbar({
            open:true,
            message:"Login Failed, Try again with correct credentials",
            type:"error"
          })
          navigate("/");
          // Handle login failure, e.g., show an error message
        }
        
    }

      return (
        <div>
          <div className='close-div'>
          <h1>Login</h1>
                <i className="bi bi-x-circle close-icon" onClick={gotohome}></i>
      
          </div>
      
        <Formik 
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            login(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div >
                <p className='login-text'>Enter email</p>
                <Field className='login-form' name="email" type="email" placeholder="Email" />
                {errors.email && touched.email ? <div>{errors.email}</div> : null}
              </div>
              <div >
                <p className='login-text'>Enter password</p>
                <Field className='login-form' name="password" type="password" placeholder="Password" />
                {errors.password && touched.password ? <div>{errors.password}</div> : null}
              </div>
              <div className='login-btns'>
              <button className='login-btn' type="submit">Login</button>
              <button className='login-btn' onClick={gotosignup}>Signup</button>
              </div>
            </Form>
          )}
        </Formik>
        </div>
      );
    };

export default LoginForm;
