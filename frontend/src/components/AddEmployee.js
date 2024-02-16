import react,{useEffect,useState,useContext} from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SERVER from '../applink.js'
function AddEmployee()
{

    const [employee,setEmployee]=useState({});
    const [Role,setRole]=useState('');
    const [list,setList]=useState([]);
    const navigate=useNavigate('');

    const { user, isLoggedIn, login, logout} = useContext(AuthContext);
    async function submitHandle(event)
    {
        event.preventDefault();
        const ob=
        {
            empid:employee.empid,
            name:employee.name,
            role:employee.role,
            head:user.empid
        }
         axios.post(`${SERVER}/employees/add`,
           ob,{ withCredentials: true }).then((resp)=>{
           if(resp.data.success==false)
           {
           toast.error(resp.data.message);
           }
           else if(resp.data.success)
           {
            console.log(resp.data.message);
            toast.success(` ${resp.data.message}`);
            setEmployee({ name :'', role: '', empid: '' });
           }
           
        })
    }
    async function submitHandleRole(event)
    {
        event.preventDefault();
        const ob={
            role:Role
        }
        
         axios.post(`${SERVER}/employees/list`,
           ob,{ withCredentials: true }).then((resp)=>{
           if(resp.data.success==false)
           {
           toast.error(resp.data.message);
           }
           else if(resp.data.success)
           {
            toast.success(`${resp.data.message}`);
            console.log(resp.data.content);
            setList(resp.data.content);
            console.log("List ",list);
           }
           
        })
    }
    useEffect(()=>{
        
    },[list])
 return(
    <div >

       <h3 >Add Employee to your Team </h3>
        <div >
    <div className='border border-2 pb-5'>
    <div className='login-form mx-auto mt-5 '>
    
<form onSubmit={submitHandle}>
       <div class="form-group mt-5 " >
          <label for="name">Name</label>
           <input type="text" class="form-control mt-3 mb-4" id="name" name="name" value={employee.name} onChange={(e)=>setEmployee({...employee,name:e.target.value})} ></input>
    </div>
    <div class="form-group">
    <label for="empid">Empid</label>
    <input type="text" class="form-control mt-2 mb-3" id="empid"  name="empid"  value={employee.empid} onChange={(e)=>setEmployee({...employee,empid:e.target.value})}></input>
    </div>
 
    <div class="form-group">
    <label for="role">Role</label>
    <input type="text" class="form-control mt-2 mb-3" id="role"  name="role" value={employee.role} onChange={(e)=>setEmployee({...employee,role:e.target.value})}></input>
     </div>
     <button type="submit" class="btn btn-primary">Add</button>
</form>
  </div>  
  </div>     
</div>
<div >
<form onSubmit={submitHandleRole}>
    <div className=' d-flex mt-3  border border-2'>
       <div class="form-group  mx-5 mt-2 w-50" >
          <label for="Role">Search for Unassigned Employees</label>
           <input type="text" class="form-control mt-3 mb-4" id="Role" name="Role" value={Role} onChange={(e)=>setRole(e.target.value)} ></input>
      </div>
       <div>
     <button type="submit" class="btn btn-primary mt-5 mx-3">Check</button>
     </div>
     </div>
</form>
</div>
<div>
    {
    list.map((item,ind)=>{
      return (   <div key={ind} className="col-md-4 mt-3">
         <div className="card mb-4 shadow-sm">
             <div className="card-body">
                 <h5 className="card-title">Emp ID: {item.empid}</h5>
                 <p className="card-text">Name: {item.name}</p>
                 <p className="card-text">Role {item.role}</p>
                 <p className="card-text">Contact: {item.contact}</p>
             </div>
         </div>
     </div>)
    })

    }
</div>
    </div>
 )
}
export default AddEmployee;