import React,{useState} from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios from 'axios';

const CreatepostModal = ({ isOpen, toggle }) => {

    const [selectedFileName, setSelectedFileName] = useState('');
    const [caption, setCaption] = useState('');

    const handleCaptionChange = (event) => {
    const value = event.target.value;
    setCaption(value);
  };

    const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFileName(selectedFile ? selectedFile.name : '');
    // Now you can do something with the selected file, like saving it to local storage
    console.log('Selected file:', selectedFile);
  };









  return (
    <Modal isOpen={isOpen} toggle={toggle}>
  <ModalHeader toggle={toggle} style={{ background: '#131313', color: '#ffc700' }}>Create a new post</ModalHeader>
  <ModalBody style={{background:"#131313"}}>
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-300 border border-black-800 p-4 shadow-lg max-w-2xl" style={{ background: '#131313', color: '#ffc700' }}>
      <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"    value={caption}
        onChange={handleCaptionChange} spellCheck="false" placeholder="Write something about this post" type="text" style={{ background: '#131313', color: '#ffc700' }} />
      {/* Icons */}
      <div className="icons flex text-gray-500 m-2">


{/* this muted fields can be used for location and tags */}
        {/* <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ffc700' }}>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ffc700' }}>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg> */}


         
    <div>
      <label htmlFor="fileInput">
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
        {/* <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto" style={{ background: '#131313', color: '#ffc700' }} onClick={toggle}>Cancel</div> */}
        <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" style={{ background: '#ffc700', color: '#131313' }}>Post</div>
      </div>
    </div>
  </ModalBody>
  <ModalFooter>
    <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto" onClick={toggle} style={{ backgroundColor: '#131313', color: '#ffc700' }}>Cancel</div>
  </ModalFooter>
</Modal>






  )
}

export default CreatepostModal