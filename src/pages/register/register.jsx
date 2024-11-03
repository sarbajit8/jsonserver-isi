import React, { useState } from 'react'
import './register.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

const Register = () => {

  const [id, setId] =useState("");
  const [name, setName] =useState("");
  const [password, setPassword] =useState("");
  const usenavigate = useNavigate();


 const handleSubmit=(e)=>{
  e.preventDefault();
   let regobj = {id,name,password};
  //  console.log(regobj);
  // fetch("http://localhost:3000/users",{
  //       method:"POST",
  //       headers:{'content-type':'application/json'},
  //       body:JSON.stringify(regobj)
  // })

  axios.get(`http://localhost:3000/users?id=${id}`)
    .then((response) => {
      if (response.data.length > 0) {
          alert("Email already exists. Please use a different email.");
         } else {
  axios.post('http://localhost:3000/users', regobj)
  .then((res)=>{
    alert("Register success full");
    usenavigate('/login')

  }).catch((err)=>{
    alert("Registration not successfull");

  })  
}

 })
}

  return <>
  {/* //   <section className='login-containers'>
  //   <div className="container">
  //     <form onSubmit={handleSubmit}>
  //     <div className="login-contents email">
  //        <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder='name' required/>
  //     </div>
  //     <div className="login-contents ">
  //        <input value={id} onChange={e=>setId(e.target.value)} type="text" placeholder='Email' required/>
  //     </div>
  //     <div className="login-contents">
  //        <input value={password} onChange={e=>setPassword(e.target.value) }  type='password' placeholder='password' required/>
  //     </div>
  //     <div className="login-contents">
  //       <p>If already registered then login <Link to={"/login"}>Log in</Link></p>
  //     </div>
  //     <button type='submit'>Register</button>
  //     </form>
  //   </div>
  // </section> */}




<div className='bold-line'></div>
<div className='container'>
  <div className='window'>
    <div className='overlay'></div>
    <div className='content'>
    <form onSubmit={handleSubmit}>
      <div className='welcome'>Hello There!</div>
      <div className='subtitle'> Before using our services you need to create an account.</div>
      <div className='input-fields'>
        {/* <input type='text' placeholder='Username' className='input-line full-width'/> */}
        <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder='name' className='input-line full-width' required/>
        {/* <input type='email' placeholder='Email' className='input-line full-width'/> */}
        <input value={id} onChange={e=>setId(e.target.value)} type="text" placeholder='Email'  className='input-line full-width' required/>
        {/* <input type='password' placeholder='Password' className='input-line full-width'/> */}
        <input value={password} onChange={e=>setPassword(e.target.value) }  type='password' placeholder='password' className='input-line full-width' required/>

      </div>
      <div className='spacing'>if account exist then<span className='highlight'><Link to={"/login"} style={{textDecoration:'none',color:'white'}}>LOG IN </Link></span></div>
      <div><button type='submit' className='ghost-round full-width'>Create Account</button></div>
      </form>
    </div>
  </div>
</div>
    





 </>
}

export default Register