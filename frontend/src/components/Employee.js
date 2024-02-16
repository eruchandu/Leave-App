import {React,useContext,useState,useEffect} from "react";
import AuthContext from '../contexts/AuthContext.js';
import {useNavigate} from 'react-router-dom'
import Approval from "./Approval.js";
import Leaves from "./Leaves.js";
import Profile from './Profile.js'
import ApplyLeave from "./ApplyLeave.js";
import Employees from "./Employees.js";
import AddEmployee from "./AddEmployee.js";
import SERVER from '../applink.js'
import '../css/Employee.css';
import { FaUser } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { FcAcceptDatabase } from "react-icons/fc";
import { PiUsersThreeBold } from "react-icons/pi";
import { TiUserAdd } from "react-icons/ti";
function Employee()
{
const navigate=useNavigate('');
const { user, isLoggedIn, login, logout } =useContext(AuthContext);
const [activeTab, setActiveTab] = useState('profile'); // Default active tab is profile

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  let locallog=localStorage.getItem('isLoggedIn');
  let localdata=JSON.parse(localStorage.getItem('user'));
 
  useEffect(() => {
    
    console.log("Employee useeffect local",locallog,"context",isLoggedIn,"user",user,"Local user",localdata);
    if (!locallog) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  

  return (
    <div className="container  mt-5">
      <div className="row">
        <div className="col-md-3 sidebar">
          <div className="list-group ms-2">
            <button 
              className={` list-group-item list-group-item-action ${
                activeTab === 'profile' && 'active'
              }`}
              onClick={() => handleTabClick('profile')}>
              <FaUser className='me-2'/>   Profile
            </button>
            <button
              className={` list-group-item list-group-item-action ${
                activeTab ==='leaveHistory' && 'active'
              }`}
              onClick={() => handleTabClick('leaveHistory')}
            >
             <MdHistory className='me-2'/> Leave History
            </button>
            <button
              className={` list-group-item list-group-item-action ${
                activeTab === 'applyLeave' && 'active'
              }`}
              onClick={() => handleTabClick('applyLeave')}
            >
             <FaWpforms className='me-2'/> Apply Leave
            </button>
           {user.isManager&& <button
              className={`btn list-group-item list-group-item-action ${
                activeTab === 'approvals' && 'active'
              }`}
              onClick={() => handleTabClick('approvals')}
            >
              <FcAcceptDatabase className='me-2'/>Approvals
            </button>}
            {/* {user.isManager && <button
              className={`list-group-item list-group-item-action ${
                (activeTab === 'employee' || activeTab === 'employees' || activeTab === 'addEmployee') && 'active'
                }`}
              onClick={() => handleTabClick('employee')}
            >
              Management
            </button>} */}
            { user.isManager && <div>
              <button
                className={`btn list-group-item list-group-item-action ${
                  activeTab === 'employees' && 'active'
                  }`}
                onClick={() => handleTabClick('employees')}
              >
               <PiUsersThreeBold className='me-2'/> Employees
              </button>
              <button
                className={`btn btn-secondary list-group-item list-group-item-action ${
                  activeTab === 'addEmployee' && 'active'
                  }`}
                onClick={() => handleTabClick('addEmployee')}
               >
               <TiUserAdd className='me-2'/> Add Employee
              </button>
            </div> }
          </div>
        </div>
      
        <div className="col-md-9">
          {isLoggedIn ? (
            <div>
              {activeTab === 'profile' && <Profile user={user} />}
              {activeTab === 'leaveHistory' && <Leaves user={user} />}
              {activeTab === 'applyLeave' && <ApplyLeave user={user} />}
              {activeTab === 'approvals' &&<Approval user={user} />}
              {activeTab === 'employees' && <Employees user={user}></Employees>}
              {activeTab === 'addEmployee' && <AddEmployee user={user}></AddEmployee>}
            </div>
          ) : (
            navigate('/')
          )}
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}
export default Employee

