import React, { useEffect, useState } from 'react'
import {json, Link, useNavigate} from 'react-router-dom'
import './home.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Home = () => {

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);  

const [show1, setShow1] = useState(false);

const handleClose1 = () => setShow1(false);

const [show2, setShow2] = useState(false);

const handleClose2 = () => setShow2(false);
  


	const usenavigate = useNavigate(); 

//add users
const [id,setId]= useState("");
const [name,setName]= useState("");
const [password,setPassword]= useState("");
const [image,setImage]= useState(null);

const handleSubmit = (e) => {
    e.preventDefault();
    let regobj = { id, name, password, image: image ? image.name : null }; // Use image name only

    axios.get(`http://localhost:3000/users?id=${id}`)
    .then((response) => {
        if (response.data.length > 0) {
            alert("Email already exists. Please use a different email.");
        } else {
            axios.post('http://localhost:3000/users', regobj)
            .then((res) => {
                alert("Registration successful");
                window.location.reload();
            }).catch((err) => {
                alert("Registration not successful");
            })
        }
    })        
}

const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
        setImage(file); // Store the file object if needed for other purposes
        console.log(file.name); // Log the file name (optional)
    }
};



const [userdtls, setUserdtls]= useState({});

const LoadDetail=(id)=>{
	setShow1(true)
	
        fetch(`http://localhost:3000/users/${id}`).then((res)=>{
            return res.json();
          }).then((resp)=>{
            setUserdtls(resp);
						 			     
          }).catch((err)=>{
            console.log(err.message);
            
          })
		   
  

}

const handleSubmitedit = (e,id)=>{
	e.preventDefault();
	let regobj = { id, name, password, image: image ? image.name : null };

axios.patch(`http://localhost:3000/users/${id}`, regobj)
.then((res)=>{
alert("Updated successfull");
usenavigate('/home')
window.location.reload();

}).catch((err)=>{
alert("Registration not successfull");

})  
}



const LoadEdit=(id)=>{
	setShow2(true);
	

	fetch(`http://localhost:3000/users/${id}`).then((res)=>{
		return res.json();
	  }).then((resp)=>{
		setId(resp.id); 
		setName(resp.name);  
		setPassword(resp.password); 
		setImage(resp.image) 
	  }).catch((err)=>{
		console.log(err.message);
		
	  })







    

}
const Removefunction=(id)=>{
	if(window.confirm('Do you want to remove?')){
axios.delete(`http://localhost:3000/users/${id}`)
.then((res)=>{
 window.location.reload();

}).catch((err)=>{
  alert("remove not successfull");

})  
	}

}

const [user, setUser]= useState(null);
useEffect(() => {
  fetch("http://localhost:3000/users").then((res)=>{
	return res.json();
  }).then((resp)=>{
	setUser(resp);
	
	

  }).catch((err)=>{
	console.log(err.message);
	
  })
}, [])





  useEffect(() => {
    let email = sessionStorage.getItem('email');
    if(email===''|| email=== null){
      usenavigate("/login");
    }
  }, []);



  
  return <>   

 
	<section id="sidebar">
		<Link style={{textDecoration:'none'}} className="brand">
			<i className='bx bxs-smile'></i>
			<span className="text" >HOTELOASIS ADMIN</span>
		</Link>
		<ul className="side-menu top">
			<li className="active">
				<Link style={{textDecoration:'none'}}  >
					<i className='bx bxs-dashboard' ></i>
					<span className="text">Users</span>
				</Link>
			</li>
			
		</ul>
		<ul className="side-menu">
		
			<li>
				<Link style={{textDecoration:'none'}} to={"/login"} className="logout">
					<i className='bx bxs-log-out-circle' ></i>
					<span className="text">Logout</span>
				</Link>
			</li>
		</ul>
	</section>
	
    <section id="content">

		{/* <nav>
			<i className='bx bx-menu' ></i>
			<Link className="nav-link">Categories</Link>
			<form action="#">
				<div className="form-input">
					<input type="search" placeholder="Search..."/>
					<button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
				</div>
			</form>
			<input type="checkbox" id="switch-mode" hidden/>
			<label  className="switch-mode"></label>
			<Link  className="notification">
				<i className='bx bxs-bell' ></i>
				<span className="num">8</span>
			</Link>
			<Link className="profile">
				<img/>
			</Link>
		</nav> */}
		<h2 style={{textDecoration:'none',fontStyle: 'normal'}}>USERS</h2>
		{/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

     
		<div className='btt'>
		{/* <Link to={"./create"} ><button className='btadd'>Add Users</button></Link>	 */}
		<button onClick={handleShow} className='btadd'>Add Users</button>	
		</div>
		<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD NEW USERS</Modal.Title>
        </Modal.Header>
 <form onSubmit={handleSubmit} >
        <Modal.Body>
  <label >Name</label>
  <input value={name} onChange={e=>setName(e.target.value)} type="text" required/><br/><br/>
  <label >Email</label>
  <input value={id} onChange={e=>setId(e.target.value)} type="text" required/><br/><br/>
  <label  >Password</label>
  <input value={password} onChange={e=>setPassword(e.target.value)} type="text" required/><br/><br/>
  <label>Image</label>
  <input type="file" onChange={handleImageChange} required />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
		 
        </Modal.Footer>
		</form>
      </Modal>
	
		
		
<div className="table-wrapper">
    <table className="fl-table">
        <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th colSpan={3}>Action</th>
            
        </tr>
        </thead>
        <tbody>
      
			{
				user&&
				user.map((item,index)=>(
					<tr key={item.id}>

					<td>{index +1}</td> 
					<td>{item.name}</td>
					<td>{item.id}</td>
					<td onClick={()=>{LoadDetail(item.id)}} ><img  src={assets.vw} alt="" /></td>
					<td  onClick={()=>{LoadEdit(item.id)}}><img src={assets.edt} alt=""/></td>
					<td  onClick={()=>{Removefunction(item.id)}}> <img  src={assets.del} alt="" /></td>

					</tr>
				))
				
			}
		

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>VIEW</Modal.Title>
        </Modal.Header>
        <Modal.Body>
		<p>{userdtls.id}</p>
		<p>{userdtls.name}</p>
		<img src={`./image/${userdtls.image}`} alt="" />
        </Modal.Body>
        <Modal.Footer>       
        </Modal.Footer>
      </Modal>

	  {/* //edit */}
	  <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT USER</Modal.Title>
        </Modal.Header>
 <form  onSubmit={(e) => handleSubmitedit(e, id)} >
        <Modal.Body>
  <label >Name - </label>
  <input value={name} onChange={e=>setName(e.target.value)} type="text" required/><br/><br/>
  <label>Image - </label>
  <input type="file" onChange={handleImageChange} required />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button type='submit' variant="primary" onClick={handleClose2}>
            Save Changes
          </Button>
		 
        </Modal.Footer>
		</form>
      </Modal>
           
      
		
      
       

        </tbody>
    </table>
</div>
		
	</section>

	
	


   
  </>

}
export default Home