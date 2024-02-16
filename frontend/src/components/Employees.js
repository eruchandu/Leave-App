import React from 'react'
import AuthContext from '../contexts/AuthContext';
import {useEffect,useContext,useState} from 'react';
import EmployeeFormModal from './EmployeeFormModel.js'
import axios from 'axios'
import '../css/Employee.css'
import SERVER from '../applink.js'
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
    axios.post(`{SERVER}/employees/del`,employee,{ withCredentials: true })
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
        let res=await axios.post(`{SERVER}/employees`,user,{ withCredentials: true })
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
                        <button key={item.empid} className='btn btn-secondary mt-2 mx-2' onClick={() => handleEditClick(item)}> Edit </button>
                        <button key={item.empid} className='btn btn-danger mt-2 mx-2' onClick={() => handleDelete(item)}>Remove</button>
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