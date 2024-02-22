// Navbar.js
import {React,useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.js';
import '../css/navbar.css'
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import SERVER from '../applink.js'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
function Navbar() 
{
    let {user,isLoggedIn,login,logout}=useContext(AuthContext);
    const navigate=useNavigate('');
  const logoutuser=()=>{
    console.log("func function called ");
    axios.post(`${SERVER}/logout`,{},{ withCredentials: true }).then((resp)=>{
     if(resp.data.success==false)
     {
     toast.error(resp.data.message);
     navigate('/employee');
     } 
     else 
     {
      toast.success(`${user.name}Logged Out`);
      logout();
      navigate('/');
     }  

  })

   
  }
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isLoggedIn?(<div className='d-flex'>
          <li><Link onClick={logoutuser}>Logout</Link> </li>  <li><Link className='mx-2'to="/employee"> <FaUser/> </Link></li></div>):<li><Link  to='/login'>Login</Link></li>}
      
      </ul>
    </nav>
  );
}

export default Navbar;
