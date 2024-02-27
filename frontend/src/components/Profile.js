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
        let res=await axios.get(`${SERVER}/user/${user.empid}`,{ withCredentials: true })
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
  <div className="container d-md-flex">
    <div className="profile-container border w-md-50 w-100 border-2 mx-2 position-relative">
   
        <div className="circular-frame border border-2 border-dark">
          <img  style={{objectFit:"cover"}}src={userData.photo} className="w-100 h-100" alt="User Profile" />
        </div>
        <div className="d-block ms-3 mt-2">
        <button  className='btn d-block mx-auto edit' onClick={() => handleEditClick()}><CiEdit/></button>
        </div>
        <h4 className="text-center mb-3 mt-2 w-100">User Profile</h4>
        <div className="row">
          <div className="col-sm-6 w-75 mx-auto">
            <h6 className="w-75"><strong>Name  :</strong>{userData.name}</h6>
            <h6 className="w-75"><strong>Mail  :</strong> {userData.mail}</h6>
            <h6 className="w-75"><strong>Empid  :</strong>{userData.empid}</h6>
            <h6 className="w-75"><strong>Address :</strong>{userData.Address}</h6>
            <h6 className="w-75"><strong>Contact :</strong>{userData.contact}</h6>
            <h6 className="w-75"><strong>Role :</strong> {userData.role}</h6>
          </div>
        </div>
    </div>
   
    <div className="image mt-5 w-md-50 w-100 d-flex align-items-center">
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