// Navbar.js
import {React,useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.js';
import '../css/navbar.css'

function Navbar() 
{
    let {user,isLoggedIn,login,logout}=useContext(AuthContext);
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn?<li><Link to="/login">Login</Link></li>:<li><Link onClick={logout}>Logout</Link></li>}
        
      </ul>
    </nav>
  );
}

export default Navbar;
