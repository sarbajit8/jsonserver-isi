import React from 'react'
import Login from './pages/login/login'
import {Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Register from './pages/register/register'

import Create from './components/create'

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
  
  <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home/create" element={<Create/>}/>
          {/* <Route path="/home/detail/:id" element={<Detail/>}/>
          <Route path="/home/edit/:id" element={<Edit/>}/> */}

  </Routes>

    </div>
  )
}

export default App