import {React,useContext,useEffect,useState} from "react";
import axios from "axios";
import AuthContext from '../contexts/AuthContext.js';
import {useNavigate} from 'react-router-dom'
import UserFormModal from "./UserFormModal.js";
import '../css/profile.css'
import SERVER from "../applink.js";
import { CiEdit } from "react-icons/ci";

function Profile(props)
{

  const { user, isLoggedIn, login, logout } =useContext(AuthContext);
  const[userData,setUserData]=useState(user);
  const [showModal, setShowModal] = useState(false);
  const [updateUi,setUpdateUi]=useState(0);

 const handleEditClick = () => {
   setShowModal(true);
 };
 async function getData()
    {
        console.log("get function called ");
        let res=await axios.post(`${SERVER}/user`,userData,{ withCredentials: true })
        setUserData(res.data.content)
        console.log("verification in front end ",res.data.content);
  
    }
useEffect(()=>{
        getData();
    },[])
 const handleCloseModal = () => {
   setShowModal(false);
  getData();
 };
    
    return(
      <div className="d-flex mt-2">
  <div className="container d-flex">
    <div className="profile-container border border-2 w-50 mx-2">
      <div className="w-50 position-relative d-flex">

        <div className="circular-frame border border-2 border-dark  mx-auto">
          <img  style={{objectFit:"cover"}}src={userData.photo} className="w-100 h-100" alt="User Profile" />
        </div>
        
      </div>
      <button  className='btn mt-2 d-block ms-auto' onClick={() => handleEditClick()}><CiEdit/></button>
      <h1 className="text-center mb-3 mt-5">User Profile</h1>
      <div className="row">
        <div className="col-sm-6 w-75 mx-auto">
          <h6><strong>Name  &nbsp;&nbsp;&nbsp;&nbsp;:</strong>&nbsp;&nbsp;{userData.name}</h6>
          <h6><strong>Mail  :</strong> &nbsp;{userData.mail}</h6>
          <h6><strong>Empid  &nbsp;&nbsp;&nbsp;:</strong>&nbsp;&nbsp;{userData.empid}</h6>
          <h6><strong>Address&nbsp;:</strong> &nbsp;&nbsp;{userData.Address}</h6>
          <h6><strong>Contact&nbsp; :</strong>&nbsp;&nbsp;{userData.contact}</h6>
          <h6><strong>Role &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;:</strong> &nbsp;&nbsp;{userData.role}</h6>
        </div>
      </div>
    </div>
   
    <div className="image mt-5 d-flex align-items-center">
      <img style={{objectFit:"center"}}src="../dashboard.svg"  className="w-75 d-block ms-auto"/>
    </div>
   
  </div>
  {console.log("userdata in profile",userData)}
  {showModal && (
        <UserFormModal employee={userData} onClose={handleCloseModal} />
      )}
</div>
)
}
export default Profile;