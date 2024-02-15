import react, { useState,useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login(){
  let [User,SetUser]=useState({empid:'',password:''});

const { user, isLoggedIn, login, logout} = useContext(AuthContext);

const navigate=useNavigate('');
function submitHandler(event)
{
    event.preventDefault();
      axios.post('http://localhost:3500/',{
          empid:User.empid,
          password:User.password
      },{ withCredentials: true }).then((resp)=>{
          
         if(resp.data.success==false)
         {
         toast.error(resp.data.message);
         navigate('/login');
         } 
         else 
         {
          toast.success(`${resp.data.content.name} Logged In`);
          console.log(resp.data.content,typeof(resp.data.content));
          login(resp.data.content);
          navigate('/employee');
         }  

      })
    

}

return(
     <div className='border border-5 w-50 mx-auto mt-5 pb-4 shadow'>
    <div className='login-form mx-auto w-75 mt-5 '>
       <form onSubmit={submitHandler}>
  <div class="form-group mt-5" >
    <label for="empid">Employee id</label>
    <input type="text" class="form-control mt-3 mb-4" id="empid" name="empid" onChange={(e)=>SetUser({...User,empid:e.target.value})} ></input>
    
    
  </div>
  <div class="form-group">
    <label for="Password">Password</label>
    <input type="password" class="form-control mt-2 mb-3" id="Password"  name="password" onChange={(e)=>SetUser({...User,password:e.target.value})}></input>
  </div>
  
  <button type="submit" class="btn btn-primary d-block mx-auto">Submit</button>
</form>

    </div>
    </div>
    
)
}
export default Login