import React,{useState} from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axiosInstance, { baseURL } from '../../api/api';
import { toast } from 'react-toastify';


const EditprofileModal = ({ isOpen, toggle }) => {

    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedFile,setSelectedFile] = useState(null);
    const [first_name,setFirstname] = useState('');
    const [last_name,setLastname] = useState('');

    const handleFirstnameChange = (event) => {
    const value = event.target.value;
    setFirstname(value);
  };

    const handleLastnameChange = (event) => {
    const value = event.target.value;
    setLastname(value);
  };


    const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileName(file ? file.name : '');
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    
    // Append fields only if they are not empty
    if (selectedFile) {
      formData.append('profile_image', selectedFile); 
    }
    if (first_name) {
      formData.append('first_name', first_name); 
    }
    if (last_name) {
      formData.append('last_name', last_name);
    }

    const accessToken = localStorage.getItem('accessToken');

    const response = await axiosInstance.put(`${baseURL}/api/authentication/userupdate/`, formData);

    toast.success("Saved Successfully")
    setFirstname('');
    setLastname('');
    setSelectedFileName('');
    window.location.href = '/userprofile';
  } catch (error) {
    console.error('Error:', error);
  }
};

    
  return (
     <Modal isOpen={isOpen} toggle={toggle}>
  <ModalHeader toggle={toggle} style={{ background: '#131313', color: '#ffc700' }}>Edit Your Profile</ModalHeader>
  <ModalBody style={{background:"#131313"}}>

    <div className="editor mx-auto w-10/12 flex flex-col text-gray-300 border border-black-800 p-4 shadow-lg max-w-2xl" style={{ background: '#131313', color: '#ffc700' }}>
      <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"    value={first_name}
        onChange={handleFirstnameChange} spellCheck="false" placeholder="Change firstname" type="text" style={{ background: '#131313', color: '#ffc700' }} />
      
      <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"    value={last_name}
        onChange={handleLastnameChange} spellCheck="false" placeholder="Change lastname" type="text" style={{ background: '#131313', color: '#ffc700' }} />
      <div className="icons flex text-gray-500 m-2">
         
    <div>
     
      <label htmlFor="fileInput" className='flex'>
        <svg
          className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ color: '#ffc700' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
        <span className='text-gray-400'>Change DP</span>
      </label>
       
      <input
        id="fileInput"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {selectedFileName && (
        <p>Selected File: {selectedFileName}</p>
      )}
    </div>

      </div>
      {/* Buttons */}
      <div className="buttons flex">
        <div onClick={handleSubmit} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" style={{ background: '#ffc700', color: '#131313' }}>Save</div>
      </div>
    </div>
  </ModalBody>
  <ModalFooter>
    <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto" onClick={toggle} style={{ backgroundColor: '#131313', color: '#ffc700' }}>Cancel</div>
  </ModalFooter>
</Modal>
  )
}

export default EditprofileModal