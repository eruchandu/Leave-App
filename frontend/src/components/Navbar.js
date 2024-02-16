// Navbar.js
import {React,useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.js';
import '../css/navbar.css'
import { FaUser } from "react-icons/fa";
function Navbar() 
{
    let {user,isLoggedIn,login,logout}=useContext(AuthContext);
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isLoggedIn?(<div className='d-flex'>
          <li><Link onClick={logout}>Logout</Link></li>  <li><Link className='mx-2'to="/employee"> <FaUser/> </Link></li></div>):<li><Link  to='/login'>Login</Link></li>}
      
      </ul>
    </nav>
  );
}

export default Navbar;
