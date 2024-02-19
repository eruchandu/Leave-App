import React, { useState,useEffect } from 'react';
import axios from 'axios';
import SERVER from '../applink.js'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';

function Forget({ employee, onClose }) {
  const [user, setUser] = useState('');
  const  [displayuser,setDisplayUser]=useState(true);
  const [displayotp,setDisplayOtp]=useState(false);
  const [displaypass,setDisplayPass]=useState(false);
  const [otp,setOtp]=useState('')
  const [newpass,setNewPass]=useState('');
  const [confirmpass,setConfirmPass]=useState('');
  const navigate=useNavigate('');
useEffect(()=>{},[displayuser,displayotp,displaypass])
  const handleSubmit = async (e) => {
    console.log("handleSubmit Called");
    e.preventDefault();
    try 
    {
      //console.log(user);
      const obj={
        empid:user
      }
      let response=await axios.post(`${SERVER}/forget/`,obj,{ withCredentials: true });  
      if(response.data.success===true)
      {
        toast.success('OTP send Sucessfully');
        setDisplayUser(false);
        setDisplayPass(false);
        setDisplayOtp(true);
      }
      else{
        toast.error(`${user} Not found in DB Please Check UserName`);
        setDisplayUser(true);
        setDisplayPass(false);
        setDisplayOtp(false);
    
      }

     
    } catch (error) {
      console.error("Error in Sending OTP ", error);
    }
  };
  const handleOtp=async(e)=>
  {
       e.preventDefault();

       try 
       {
         
         const obj={
           empid:user,
           otp:otp
         }
         let response=await axios.post(`${SERVER}/forget/check`,obj,{ withCredentials: true });  
         if(response.data.success===true)
         {
           toast.success('Sucess');
        setDisplayUser(false);
        setDisplayPass(true);
        setDisplayOtp(false);
         }
         else{
        toast.error(`Wrong Otp`);
        setDisplayUser(false);
        setDisplayPass(false);
        setDisplayOtp(true);
           //setDisplay(false);
         }
   
        
       } catch (error) {
         console.error("Error in Sending OTP ", error);
       }
  }
  const handlePass=async(event)=>
  {
     event.preventDefault();
     console.log("NEW PASS ",newpass,"confirm Pass ",confirmpass);
     if(newpass==='')
     {
        toast.error(`password cannot Be  Empty`);
     }
     else if(newpass.length<5)
     {
        toast.error(`password cannot be less than 5 Chars`);
     }
     else if(newpass!==confirmpass)
     {
        toast.error(`password mismatch`);
     }
     else
     {
        const obj=
        {   empid:user,
            password:newpass
        }
        let response=await axios.post(`${SERVER}/forget/update`,obj,{ withCredentials: true });  
        if(response.data.success)
        {
            toast.success(response.data.message);
            navigate('/login');
        }
        else
        {
            toast.error('Password not updated');
        }
     }
  }

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 9999 }}>
      <div className="modal-dialog" style={{ margin: '10% auto', maxWidth: 600 }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Forgot Paaword </h5>
            <button type="button" className="close btn btn-danger" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            {displayuser&&<form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="uname">User Name</label>
                <input type="text" className="form-control" id="uname" name="uname" value={user} onChange={(e)=>{setUser(e.target.value)}} />
              </div>
              <button type="submit" className="btn btn-primary d-block mx-auto mt-3">Send OTP</button>
            </form>}
            {displayotp&&(<div>
                <form onSubmit={handleOtp}>
              <div className="form-group">
                <label htmlFor="otp">Enter Otp </label>
                <input type="text" className="form-control" id="otp" name="otp" value={otp} onChange={(e)=>{setOtp(e.target.value)}} />
              </div>
              <button type="submit" className="btn btn-primary d-block mx-auto mt-3"> Check </button>
            </form> </div>)}
            {displaypass&&(<div>
                <form onSubmit={handlePass}>
              <div className="form-group">
                <label htmlFor="newpass">New Pass </label>
                <input type="text" className="form-control" id="newpass" name="newpass" value={newpass} onChange={(e)=>{setNewPass(e.target.value)}} />
              </div>
              <div className="form-group">
                <label htmlFor="confirmpass">Confirm Pass </label>
                <input type="text" className="form-control" id="confirmpass" name="confirmpass" value={confirmpass} onChange={(e)=>{setConfirmPass(e.target.value)}} />
              </div>
              <button type="submit" className="btn btn-primary d-block mx-auto mt-3"> Save Password </button>
            </form> </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forget;