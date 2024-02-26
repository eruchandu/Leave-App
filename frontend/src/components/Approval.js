import react, { useState,useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Approval.css'
import SERVER from '../applink.js'
import LeaveModal from './leaveModal.js';
import {LuFileCheck  } from "react-icons/lu";
import { FaFileCircleXmark } from "react-icons/fa6";

 function Approval()
{
    const { user, isLoggedIn, login, logout} = useContext(AuthContext);
    const [approvals,setApprovals]=useState([]);
    let [updateui,setUpdateUi]=useState(0);
    const [leaveDetails,setDetails]=useState({});
    const [showModal, setShowModal] = useState(false);
    async function getData()
    {
        let res=await axios.post(`${SERVER}/approval`,user,{ withCredentials: true })
         setApprovals(res.data.content);
    }
    useEffect(()=>{
        getData();
       },[updateui])

      function fun(item,update)
      {
        const obj={...item};
        obj.update=update;
        axios.post(`${SERVER}/approving`,obj,{ withCredentials: true }).then((res)=>{
        console.log("fun update",res) 
        getData();
            
       } );
       setUpdateUi(approvals.length)
      }
     async  function  displayDetails(item)
      {
        const obj=
        {empid:item.empid};
        let leaveObj={...item};
        axios.post(`${SERVER}/getleaves`,obj,{ withCredentials: true }).then((resp)=>{
             if(resp.data.success==false)
             {
             toast.error(resp.data.message);
             }
             else if(resp.data.success)
             {
              leaveObj.granted=resp.data.content[0]?.granted
              leaveObj.pending=resp.data.content[0]?.pending;
              leaveObj.total=resp.data.content[0]?.total;
              leaveObj.name=resp.data.content[0]?.name;
              setDetails(leaveObj);
              setShowModal(true);
             }
          })
      }
   const handleCloseModal = () =>
    {
        setShowModal(false);
     };
    return(
         <div className="container mx-auto">
            <h1 className="mt-5">Approvals</h1>
            <div className="row mt-4">
               
                {approvals?.map((item, ind) => (
                    <div key={ind} className="col-md-4 col-sm-6 col-lg-3 approval">  
                        <div className="card mb-4 shadow-sm ">
                            <div className="card-body leaves" onClick={()=>displayDetails(item)}>
                                <h5 className="card-title">Emp ID: {item.empid}</h5>
                                <p className="card-text">Status: {item.status}</p>
                                <p className="card-text">From: {item.from}</p>
                                <p className="card-text">To: {item.to}</p>
                                {item.days&& <p className="card-text">No of Days: {item.days}</p>}
                                <p className="card-text">Message: {item.message}</p>
                            </div>
                            
                        </div>
                        <div className='d-flex justify-content-around'>
                        <button className='btn btn-success  mx-2' onClick={() => fun(item, "Grant")}> <LuFileCheck/></button>
                         <button className='btn btn-danger mx-2 ' onClick={() => fun(item, "Reject")}> <FaFileCircleXmark/> </button>
                      </div>
                    </div>
                   
                ))}


            </div>  
  
            {showModal && (
        <LeaveModal leaveDetails={leaveDetails} onClose={handleCloseModal} />
      )}
        </div>
        )
      
}
export default Approval;