import react, { useState,useContext,useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/ApplyLeave.css'
import SERVER from '../applink.js'
function daysDifference(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  const startDayOfWeek = firstDate.getDay(); 
  const endDayOfWeek = secondDate.getDay(); 
  let totalWeekends = Math.floor((diffDays + startDayOfWeek - endDayOfWeek) / 7) * 2;
  const diffWithoutWeekends = diffDays - totalWeekends;
  return diffWithoutWeekends + 1; 
}

function ApplyLeave(props)
{

    const [leave,setLeave]=useState({from:'',to:'',message:''});
    const navigate=useNavigate('') 
    const {user, isLoggedIn, login, logout} = useContext(AuthContext);
    const [grant,setGranted]=useState(0);
    const [pend,setPending]=useState(0);
    const [uiUpdate,setUiUpdate]=useState(0);
    const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index

const firstDayOfMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
const lastDayFormatted = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${lastDayOfMonth}`;

    function getLeaves()
    {
      const obj=
      {empid:user.empid}
      axios.post(`${SERVER}/getleaves`,obj,{ withCredentials: true }).then((resp)=>{
           if(resp.data.success==false)
           {
           toast.error(resp.data.message);
           }
           else if(resp.data.success)
           {
            console.log("front end",resp.data.content);
            setGranted(resp.data.content[0]?.granted);
            setPending(resp.data.content[0]?.pending);
            setUiUpdate(resp.data.content[0]?.pending);
            console.log(user.total,pend,grant);
           }
           
        })
       
    }
    useEffect(()=>{
      getLeaves();
    },[uiUpdate])

    async function submitHandle(event)
    {
        event.preventDefault();
        const formData = new FormData();
        formData.append('from', leave.from);
        formData.append('to', leave.to);
        formData.append('description', leave.message);
        formData.append('image', event.target.elements.image.files[0]);
        formData.append('empid',user.empid);
        formData.append('head',user.head);
        formData.append('status','pending');
        const days=pend+grant;
        console.log("Hold = ",days);
        const diff=daysDifference(leave.from,leave.to)
        console.log(diff);
        console.log("leaves ==== ",leave);
        if(leave.from>leave.to)
          toast.error("To Date Cannot be before from Date");
        else if(diff+grant+pend>user.total)
          toast.error(`Only ${user.total-(pend+grant)} Leaves are Avilaiable`);
        else  if(leave.from==='')
        toast.error('From date Cannot be Empty');
        else if(leave.to==='')
        toast.error('To date Cannot be Empty');
        else if(leave.message==='')
        toast.error('Description Cannot be Empty');
        else if(!event.target.elements.image.files[0])
        toast.error('Image file Cannot be Empty');
        else if(checkWeekend(leave.from))
          toast.error('From cant be  Weekend');
        else if(checkWeekend(leave.to))
          toast.error('To Date cannot be Weekend');
        else
        {
     
         axios.post(`${SERVER}/apply`,
           formData,{ withCredentials: true }).then((resp)=>{
           if(resp.data.success==false)
           {
           toast.error(resp.data.message);
           }
           else if(resp.data.success)
           {
            console.log(resp.data.message);
            toast.success(` ${resp.data.message}`);
            setUiUpdate(uiUpdate+1);
            setLeave({ from: '', to: '', message: '' ,file:''});

           }
           
        })
      
      }
    }
    function checkWeekend(val)
    {
     let temp=new Date(val);
     temp=temp.getDay();
     console.log(temp);
     if(temp===0||temp===6)
     return true;
     else
     return false;
    }
    
  
    
    return(
<div >

  <div className="container d-flex justify-content-between">
      <div className="leave-info ">
        <h1>Total </h1> 
        <div className="d-flex justify-content-between">
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.total}</h2>
        </div>
      </div>
      <div className="leave-info ">
        <h1>Granted </h1> <h2>&nbsp;&nbsp;{grant} </h2> 
      </div>
      <div className="leave-info ">
        <h1>Pending  </h1>
        <h2> &nbsp;&nbsp;&nbsp;{pend}</h2>
      </div>
  
  </div>
    <div className='border border-2  mt-5 pb-5'>
    <div className='login-form mx-auto mt-5 '>
    <h1 > Apply Leave </h1>
<form onSubmit={submitHandle} encType='multipart/form-data'>
       <div class="form-group mt-5 " >
          <label for="from">From</label>
           <input type="date" class="form-control mt-3 mb-4" id="from" name="from" value={leave.from} onChange={(e)=>setLeave({...leave,from:e.target.value})}  min={firstDayOfMonth} max={lastDayFormatted}
></input>
      </div>
    <div class="form-group">
    <label for="to">To</label>
    <input type="date" class="form-control mt-2 mb-3" id="to"  name="to"  value={leave.to} onChange={(e)=>setLeave({...leave,to:e.target.value})}min={firstDayOfMonth}
       max={lastDayOfMonth}></input>
    </div>
 
    <div class="form-group">
    <label for="message">Description</label>
    <input type="text" class="form-control mt-2 mb-3" id="message"  name="message" value={leave.message} onChange={(e)=>setLeave({...leave,message:e.target.value})}></input>
     </div>
     <div class="form-group">
    <label for="image">Attach File</label>
    <input type="file" class="form-control mt-2 mb-3" id="image"  name="image" value={leave.image} ></input>
     </div>
     <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>  
  </div>     
</div>)
}
export default ApplyLeave;