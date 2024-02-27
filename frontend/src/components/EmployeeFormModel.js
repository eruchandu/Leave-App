import React, { useState } from 'react';
import axios from 'axios';
import SERVER from '../applink.js'

function EmployeeFormModal({ employee, onClose }) {
  const [formData, setFormData] = useState({
    name: employee.name,
    role: employee.role,
    contact: employee.contact,
    Address: employee.Address,
    total:employee.total,
    image:employee.photo,
    empid:employee.empid,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit Called");
    e.preventDefault();
    try 
    {
      await axios.post(`${SERVER}/employees/${employee.empid}`,formData,{ withCredentials: true });
      onClose();
    } catch (error) {
      console.error("Error updating employee details:", error);
    }
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 9999 }}>
      <div className="modal-dialog" style={{ margin: '10% auto', maxWidth: 600 }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Employee Details</h5>
            <button type="button" className="close btn btn-danger " onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
          <div className="row d-flex">
            
        <div className="col-sm-6 w-75 d-block mx-auto">

          <h6><strong>Name:</strong> &nbsp;&nbsp;&nbsp; {formData.name}</h6>
          <h6><strong>Empid:</strong> &nbsp;&nbsp;&nbsp;   {formData.empid}</h6>
          <h6><strong>Contact:</strong> &nbsp;&nbsp;&nbsp;   {formData.contact}</h6>
        </div>
      </div>
            <form onSubmit={handleSubmit}>
              
              <div className="form-group w-75 mx-auto">
            <label htmlFor="role">Role</label>
            <select className="form-control w-100" id="role" name="role" value={formData.role} onChange={handleChange}>
            <option disabled>{formData.role}</option>
            <option value="Intern">Intern</option>
                <option value="SDE-I">SDE-I</option>
                <option value="SDE-II">SDE-II</option>
                <option value="SDE-III">SDE-III</option>
            </select>
        </div>
              <div className="form-group w-75 mx-auto">
                <label htmlFor="total">Total Leaves</label>
                <input type="number" className="form-control" id="total" name="total" value={formData.total} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary d-block mx-auto mt-3">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeFormModal;
