import React from 'react'
import { Modal, ModalBody,ModalHeader } from 'reactstrap'
import axiosInstance, { baseURL } from '../../api/api';
import { toast } from 'react-toastify';

const Reportpostmodal = ({ isOpen,toggle,postId}) => {
 
  
  const handleSubmitReport = async () => {
  try {
    const response = await axiosInstance.post(`${baseURL}/api/posts/reportpost/${postId}/`);
    toggle();
    toast.success("Reported Successfully")
  } catch (error) {
    console.error('Error:', error);
    toast.error("Something Wrong")
  }
};

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
  <ModalHeader toggle={toggle} style={{ background: '#131313', color: '#ffc700' }}>Report this post?</ModalHeader>
  <ModalBody style={{background:"#131313"}}>
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-300  p-4 shadow-lg max-w-2xl" style={{ background: '#131313', color: '#ffc700' }}>
      <div>
        <div onClick={handleSubmitReport} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" style={{ background: '#ffc700', color: '#131313' }}>Report</div>
        &nbsp;&nbsp;
        <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto" onClick={toggle} style={{ backgroundColor: '#131313', color: '#ffc700' }}>Cancel</div>
      </div>
    </div>
  </ModalBody>
</Modal>
  )
}

export default Reportpostmodal