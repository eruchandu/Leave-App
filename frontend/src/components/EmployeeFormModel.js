import React, { useState } from 'react';
import axios from 'axios';

function EmployeeFormModal({ employee, onClose }) {
  const [formData, setFormData] = useState({
    name: employee.name,
    role: employee.role,
    contact: employee.contact,
    Address: employee.Address,
    total:employee.total
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
      await axios.post(`http://localhost:3500/employees/${employee.empid}`,formData,{ withCredentials: true });
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
            <h5 className="modal-title">Edit Employee Details</h5>
            <button type="button" className="close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="contact">Contact</label>
                <input type="text" className="form-control" id="contact" name="contact" value={formData.contact} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="Address">Address</label>
                <input type="text" className="form-control" id="Address" name="Address" value={formData.Address} onChange={handleChange} />
              </div>
              <div className="form-group">
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
