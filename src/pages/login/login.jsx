import React, { useEffect, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import './login.css'

const Login = () => {
    
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const usenavigate = useNavigate();

  useEffect(() => {

sessionStorage.clear();  
   
  }, [])
  

  const ProceedLogin = (e) =>{
    e.preventDefault();
    
      // console.log("proceed");
      axios.get(`http://localhost:3000/users/${email}`)
      // .then((res)=>{
      //   return res.json();
      // })
      .then((resp)=>{
        console.log(resp); 
        console.log(resp.data.name);
        
        
        //again if you want to do this using fetch then also change resp.data to resp
        if(Object.keys(resp.data).length===0){
          alert("Please Enter Valid Email");
        }else{
          if(resp.data.password===password){
            sessionStorage.setItem('email',email);
            // sessionStorage.setItem('name',resp.data.name); 
            usenavigate('/home');

          }else{
            alert("Please Enter Valid Password");
          }
        }
      }).catch((err)=>{
        alert("Login Faied"+err.message);
      })
      
    
  } 

  return <>
    <div className='bold-line'></div>
<div className='container'>
  <div className='window'>
    <div className='overlay'></div>
    <div className='content'>
    <form onSubmit={ProceedLogin}>
      <div className='welcome'>Hello There!</div>
      <div className='subtitle'> Before using our services you need to log in.</div>
      <div className='input-fields'>
        {/* <input type='email' placeholder='Email' className='input-line full-width'/> */}
        <input value={email} onChange={e=>setEmail(e.target.value)} type="text" placeholder='Email'  className='input-line full-width' required/>
        {/* <input type='password' placeholder='Password' className='input-line full-width'/> */}
        <input value={password} onChange={e=>setPassword(e.target.value) }  type='password' placeholder='password' className='input-line full-width' required/>

      </div>
      <div className='spacing'>Create new account <span className='highlight'><Link to={"/"} style={{textDecoration:'none',color:'white'}}>Create Now</Link></span></div>
      <div><button type='submit' className='ghost-round full-width'>Log In</button></div>
      </form>
    </div>
  </div>
</div>
    
    </>
}

export default Login