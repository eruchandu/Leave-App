
import react, { useState,useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Leaves.css'
import SERVER from '../applink.js'
import LeaveModal from './leaveModal.js';
import { RiDeleteBin5Fill } from "react-icons/ri";
function Leaves(props)
{
    const { user, isLoggedIn, login, logout} = useContext(AuthContext);
    const [leaves,setLeaves]=useState([]);
    const [leaveDetails,setDetails]=useState({});
    const [showModal, setShowModal] = useState(false);
    
    async function getData(){
        let res=await axios.get(`${SERVER}/leaves/${user.empid}`,{ withCredentials: true })
         setLeaves(res.data.content)
    }
    useEffect(()=>{
        getData();
     },[])
      async function delleave(item)
      {
           console.log("del Leave function called")
           let res=await axios.post(`${SERVER}/revoke`,item,{ withCredentials: true })
         //  setLeaves(res.data.content)
           getData();
          // console.log("leaves after deleting",leaves,res.data.success);
      }
      async  function  displayDetails(item)
      {
        let leaveObj={...item};
        axios.get(`${SERVER}/getleaves/${item.empid}`,{ withCredentials: true }).then((resp)=>{
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
         <div className="container">
            <h1 className="mt-5"> Leaves </h1>
            <div className="row mt-4 ">
                {leaves?.map((item, ind) => {
                 return( 
                   
                 <div key={ind} className="col-md-4 col-sm-6 col-lg-3 Leave-card mt-3">
                     {console.log(item)}
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body leaves "onClick={()=>{displayDetails(item)}}>
                                <h5 className="card-title">Emp ID: {item.empid}</h5>
                                <p className="card-text">Status: {item.status}</p>
                                <p className="card-text">From: {item.from}</p>
                                <p className="card-text">To: {item.to}</p>
                                {item.days&& <p className="card-text">No of Days: {item.days}</p>}
                                <p className="card-text">Message: {item.message}</p>
                           
                            </div>

                        </div>
                        {item.status=='pending'&&<button className='btn btn-danger mx-auto d-block' onClick={()=>{delleave(item)}}><RiDeleteBin5Fill/></button>}
                    </div>)})}
            </div>
            {showModal && (
        <LeaveModal leaveDetails={leaveDetails} onClose={handleCloseModal} />
      )}
    
        </div>)
      
}
export default Leaves;