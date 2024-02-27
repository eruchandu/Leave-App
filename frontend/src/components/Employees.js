import React from 'react'
import AuthContext from '../contexts/AuthContext';
import {useEffect,useContext,useState} from 'react';
import EmployeeFormModal from './EmployeeFormModel.js'
import axios from 'axios'
import '../css/Employee.css'
import SERVER from '../applink.js'
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
function Employees()
{
   
   const {user,isLoggedIn,login,logout}=useContext(AuthContext);
   const [users,setUsers]=useState([]);
   const [showModal, setShowModal] = useState(false);
   const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };
  const handleDelete=async (employee)=>{
    axios.delete(`${SERVER}/employees/del/${employee.empid}`,{ withCredentials: true })
    .then(res => {
        setUsers([])
        console.log(res)
        getData();
    })
  }

  const handleCloseModal = () => {
    setShowModal(false);
    getData();
  };

   async function getData()
    {
        let res=await axios.get(`${SERVER}/employees/${user.empid}`,{ withCredentials: true })
        setUsers(res.data.content)
    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <div className="container">
            <h1 className="mt-5"> Employees </h1>
            
            <div className="row mt-4 ">
            
                {users?.map((item, ind) => {
                 return( 
                 <div key={ind} className="col-md-4 col-sm-6 col-lg-3 mt-3 employees">
                        <div className="card mb-4 shadow-sm">
                        {console.log("Checking",item)}
                        
                            <div className="card-body">
                                <h5 className="card-title">Emp ID: {item.empid}</h5>
                                <p className="card-text">Name: {item.name}</p>
                                <p className="card-text">Role {item.role}</p>
                                <p className="card-text">Contact: {item.contact}</p>
                                <p className="card-text">Address: {item.Address}</p>
                                <p className="card-text">Total: {item.total}</p>
                            </div>
                          
                        </div>
                        <div className='mt-1 d-flex justify-content-around'>
                        <button key={item.empid} className='btn btn-secondary  mx-2' onClick={() => handleEditClick(item)}> <RiEdit2Line/> </button>
                        <button key={item.empid} className='btn btn-danger  mx-2' onClick={() => handleDelete(item)}><RiDeleteBin5Line/></button>
                        </div>
                    </div>
                    )

                   
                })
                    }

                 {showModal && (
        <EmployeeFormModal employee={selectedEmployee} onClose={handleCloseModal} />
      )}
                    
            </div>
        </div>
    )
}
export default Employees;