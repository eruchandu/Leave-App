import {React,useContext} from "react";
import AuthContext from '../contexts/AuthContext.js';
import {useNavigate} from 'react-router-dom'
function Admin()
{
    const navigate=useNavigate('');
    const { user, isLoggedIn, login, logout } =useContext(AuthContext);
    console.log(user)
        return (
          <div className="container mt-5">
         <div className="row justify-content-center">
        <div className="col-md-6">

          <h2> Manager </h2>
    
          {isLoggedIn ? (
            <div className="card mt-3 shadow">
              <div className="card-body">
                <h5 className="card-title">Welcome, {user.name}!</h5>
                <p className="card-text">
                  <strong>Email:</strong> {user.mail}
                </p>
                <p className="card-text">
                  <strong>Role:</strong> {user.role}
                </p>
                <p className="card-text">
                  <strong>Employee ID:</strong> {user.empid}
                </p>
                <div className="button">
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
               </div>
              </div>
              
            </div>
          ) : (
            navigate('/')
          )}
          </div>
          </div>
        </div>
        )
}
export default Admin