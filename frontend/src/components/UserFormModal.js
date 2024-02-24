import {React,useState} from 'react'
import axios from 'axios';
import SERVER from '../applink';
function UserFormModal({employee,onClose})
{
    console.log("paramter data ",employee);
    const [fData, setFormData] = useState({
        name: employee.name,
        mail: employee.mail,
        contact: employee.contact,
        Address: employee.Address,
        empid:employee.empid
      });
      //console.log("form data that has to populate in modal = ",formData);
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...fData, [name]: value });
  };
async function handleSubmit(event)
{
    event.preventDefault();

     console.log("user details Saved",employee);
      console.log("updated user after changing = ",fData);
    const formData = new FormData();
        formData.append('name', fData.name);
        formData.append('Address', fData.Address);
        formData.append('empid',fData.empid);
        formData.append('image', event.target.elements.image.files[0]);
        formData.append('contact',fData.contact);
        formData.append('mail',fData.mail);
   
        console.log("form data after setting ",formData);
    try 
    {
     console.log('in parameter ',employee.empid)
      let result=await axios.post(`${SERVER}/user/update`,formData,{ withCredentials: true });
      onClose();
      console.log("data updated sucessfully")
    } catch (error) {
      console.error("Error updating employee details:", error);
    }
}
    return (  <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 9999 }}>
    <div className="modal-dialog" style={{ margin: '10% auto', maxWidth: 600 }}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Personal Details</h5>
          <button type="button" className="close btn btn-danger" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
          <div class="form-group w-75 mx-auto">
    <label for="image">Profile Photo</label>
    <input type="file" class="form-control mt-2 mb-3" id="image"  name="image"  ></input>
     </div>
            <div className="form-group w-75 mx-auto">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={fData.name} onChange={handleChange} />
            </div>
            <div className="form-group w-75 mx-auto">
              <label htmlFor="name">Email</label>
              <input type="text" className="form-control" id="email" name="email" value={fData.mail} onChange={handleChange} />
            </div>
            <div className="form-group w-75 mx-auto">
              <label htmlFor="contact">Contact</label>
              <input type="text" className="form-control" id="contact" name="contact" value={fData.contact} onChange={handleChange} />
            </div>
            <div className="form-group w-75 mx-auto ">
              <label htmlFor="Address">Address</label>
              <input type="text" className="form-control" id="Address" name="Address" value={fData.Address} onChange={handleChange} />
            </div>
           
            <button type="submit" className="btn btn-primary d-block mx-auto mt-3">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  </div>
)
}
export default UserFormModal;