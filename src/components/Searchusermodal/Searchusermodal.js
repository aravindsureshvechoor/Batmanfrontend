import React from 'react'
import { Modal, ModalBody } from 'reactstrap'


const Searchusermodal = ({ isOpen,toggle}) => {
  return (
    <>
    <Modal isOpen={isOpen} toggle={toggle}>
  <ModalBody style={{background:"#131313"}}>
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-300 p-4 shadow-lg max-w-2xl" style={{ background: '#131313', color: '#ffc700' }}>
  <div>
    <input
      type="text"
      placeholder="Search"
      className="border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
      style={{ background: '#ffc700', color: '#131313' }}
    />
    &nbsp;&nbsp;
    <button
      className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"

      style={{ background: '#ffc700', color: '#131313' }}
    >
      Search
    </button>
    &nbsp;&nbsp;
    <div
      className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
      onClick={toggle}
      style={{ backgroundColor: '#131313', color: '#ffc700' }}
    >
      Cancel
    </div>
  </div>
</div>

    </ModalBody>
    </Modal>
    </>
  )
}

export default Searchusermodal