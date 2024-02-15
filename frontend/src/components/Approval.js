import react, { useState,useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Approval.css'
 function Approval()
{
    const { user, isLoggedIn, login, logout} = useContext(AuthContext);
    const [approvals,setApprovals]=useState([]);
    let [updateui,setUpdateUi]=useState(0);
    async function getData()
    {
        let res=await axios.post("http://localhost:3500/approval",user,{ withCredentials: true })
         setApprovals(res.data.content);
    }
    useEffect(()=>{
        getData();
       },[updateui])

      function fun(item,update)
      {
        const obj={...item};
        obj.update=update;
        axios.post('http://localhost:3500/approving',obj,{ withCredentials: true }).then((res)=>{
        console.log("fun update",res) 
        getData();
            
       } );
       setUpdateUi(approvals.length)
      }
    return(
         <div className="container mx-auto">
            <h1 className="mt-5">Approvals</h1>
            <div className="row mt-4">
               
                {approvals?.map((item, ind) => (
                    <div key={ind} className="col-md-4 approval">  
                        <div className="card mb-4 shadow-sm ">
                            <div className="card-body">
                                <h5 className="card-title">Emp ID: {item.empid}</h5>
                                <p className="card-text">Status: {item.status}</p>
                                <p className="card-text">From: {item.from}</p>
                                <p className="card-text">To: {item.to}</p>
                                <p className="card-text">Message: {item.message}</p>
                               

                            </div>
                        </div>
                        <div className='d-flex justify-content-around'>
                                    <button className='btn btn-success mt-2' onClick={() => fun(item, "Grant")}> Grant</button>
                                     <div className="mx-2"></div> 
                                 <button className='btn btn-danger mt-2' onClick={() => fun(item, "Reject")}> Reject </button>
                      </div>
                    </div>
                ))}
            </div>
        </div>)
      
}
export default Approval;