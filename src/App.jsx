import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home'
import './App.css'
import axios from "axios"
import { useState } from "react";
import PropertyList from "./pages/PropertyList"
function App() {

  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:country" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/country/:country" element={<PropertyList />} /> */}
        </Routes>
      </Router>
    
    
  )
}

export default App
