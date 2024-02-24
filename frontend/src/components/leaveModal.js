import {React,useState} from 'react'
import axios from 'axios';
import SERVER from '../applink';
function leaveModal({leaveDetails,onClose})
{
     //console.log("Modal called ",leaveDetails);
    return (  <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 9999 }}>
    <div className="modal-dialog" style={{ margin: '10% auto', maxWidth: 600 }}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Leave Details</h5>
          <button type="button" className="close btn btn-danger " onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
        <div className="row d-flex">
          
      <div className="col-sm-6 w-75 d-block mx-auto">
       <div className='d-flex justify-content-center'>
        <h4>  {leaveDetails.name}</h4>
        </div>
        <h6> <strong>Empid:</strong> &nbsp;   {leaveDetails.empid}</h6>
        <div className='d-flex  mb-1'>
        <span><strong>From:</strong> &nbsp; {leaveDetails.from}</span>
        <span><strong className='ms-4'>To:</strong> &nbsp;   {leaveDetails.to}</span>
        </div>
        <h6><strong>Message:</strong> &nbsp;   {leaveDetails.message}</h6>
        {leaveDetails.days&&<h6><strong>No fo Days :</strong> &nbsp;{leaveDetails.days}</h6>}
        <div className='d-flex justify-content-between mb-3'>
        <span><strong>Total:</strong> &nbsp;   {leaveDetails.total}</span>
        <span><strong>Granted:</strong> &nbsp; {leaveDetails.granted}</span>
        <span><strong>Pending:</strong> &nbsp;   {leaveDetails.pending}</span>
        </div>
        <div classname='w-75'>
         <img src={leaveDetails.image} className='w-100'></img>
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  </div>
)
}
export default leaveModal;