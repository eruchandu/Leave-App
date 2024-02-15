import {React,useContext} from "react";
import AuthContext from '../contexts/AuthContext.js';
import {useNavigate} from 'react-router-dom'

function Profile(props)
{

  const { user, isLoggedIn, login, logout } =useContext(AuthContext);
    
    return(
      <div class="container">
      <div class="profile-container ">
          <h1 class="text-center mb-3">User Profile</h1>
          <div class="row">
              <div class="col-sm-6 mx-auto">
                  <h6><strong>Name:</strong> {user.name}</h6>
                  <h6><strong>Mail:</strong> {user.mail}</h6>
                  <h6><strong>Empid:</strong> {user.empid}</h6>
                  <h6><strong>Address:</strong> {user.Address}</h6>
                  <h6><strong>Contact:</strong> {user.contact}</h6>
                  <h6><strong>Role:</strong> {user.role}</h6>
              </div>
          </div>
      </div>
  </div>)
}
export default Profile;