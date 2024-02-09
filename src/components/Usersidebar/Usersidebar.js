import React,{useState,useEffect} from "react";
import "./Usersidebar.css";
import { TbLogout } from "react-icons/tb";
import { CiHome } from "react-icons/ci";
import { IoMdSave } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import Notification from "../NotificationModal/Notification";
import { MdOutlineContactMail } from "react-icons/md";
import CreatepostModal from '../Createpost/CreatepostModal';
import {useDispatch} from 'react-redux';
import { clearAuth } from '../../Redux/UserSlice';
import Spinner from "../Spinner";
// import axios from 'axios';
// import { baseURL } from '../../api/api';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,     
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';


const Usersidebar = () => {
   const [modalIsOpen, setModalIsOpen] = useState(false)
   const [loading, setLoading] = useState(true); // Initially set loading to true

   const [basicModal, setBasicModal] = useState(false);
   const toggleOpen = () => setBasicModal(!basicModal);

    useEffect(() => {
      const fakeAPICall = setTimeout(() => {
        setLoading(false); // Set loading to false after the data is "loaded"
      }, 5800); // Simulating a 2-second delay, replace with actual API call

      // Cleanup function to clear the timeout in case the component unmounts
      return () => clearTimeout(fakeAPICall);
    }, []); 

 const toggleModal = () => {
    setModalIsOpen(!modalIsOpen)
 }



// const navigate = useNavigate()

const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAuth());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
  };

  if(loading){
  return <Spinner></Spinner>
}
  return (
    <>
      <body>
        <div id="wrapper" className="xl:block hidden">
          {/* <!-- Sidebar --> */}
          <div id="sidebar-wrapper" style={{ width: "35vh" }}>
            <ul className="sidebar-nav">
              <li className="sidebar-brand">
                {/* <a href="#" style={{ fontSize: "30px", width: "45vh" }}> */}
                  <img
                    src="https://e1.pxfuel.com/desktop-wallpaper/476/446/desktop-wallpaper-batman-logo-yellow-dark-hero-art-iphone-batman-black-logo-android.jpg"
                    alt="logo"
                    className="w-[90px] h-[200px] pt-1 ml-[110px] pb-14 custom-scale-80"
                  />
                {/* </a> */}
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "3%",
                  paddingLeft: "5%",
                  width: "35vh",
                  marginTop: "28%",
                }}
              >
                <CiHome
                  style={{
                    fontSize: "55px",
                    color: "#ffc700",
                    marginTop: "1%",
                  }}
                />
                <a
                  href="/home"
                  style={{
                    fontSize: "24px",
                    marginTop: "1%",
                    width: "35vh",
                    paddingTop: "5%",
                    height: "7vh",
                  }}
                >
                  Home
                </a>
              </li>

              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "3%",
                  paddingLeft: "5%",
                  width: "35vh",
                }}
              >
                <CiUser
                  style={{
                    fontSize: "55px",
                    color: "#ffc700",
                    marginTop: "1%",
                  }}
                />
                <a
                  href="/userprofile"
                  style={{
                    fontSize: "24px",
                    marginTop: "1%",
                    width: "35vh",
                    paddingTop: "5%",
                    height: "7vh",
                  }}
                >
                  Profile
                </a>
              </li>

              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "3%",
                  paddingLeft: "5%",
                  width: "35vh",
                }}
              >
                <HiOutlineSpeakerphone
                  style={{
                    fontSize: "55px",
                    color: "#ffc700",
                    marginTop: "1%",
                  }}
                />
                <a
                 onClick={toggleOpen}
                  href="#"
                  style={{
                    fontSize: "24px",
                    marginTop: "1%",
                    width: "35vh",
                    paddingTop: "5%",
                    height: "7vh",
                  }}
                >
                  Notifications
                </a>
              </li>

                  <>
      {/* <MDBBtn onClick={toggleOpen}>LAUNCH DEMO MODAL</MDBBtn> */}
      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>Modal body text goes here.</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>






















              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "3%",
                  paddingLeft: "5%",
                  width: "35vh",
                }}
              >
                <MdOutlineContactMail
                  style={{
                    fontSize: "55px",
                    color: "#ffc700",
                    marginTop: "1%",
                  }}
                />
                <a
                  href="/chat"
                  style={{
                    fontSize: "24px",
                    marginTop: "1%",
                    width: "35vh",
                    paddingTop: "5%",
                    height: "7vh",
                  }}
                >
                  Messages
                </a>
              </li>

              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "3%",
                  paddingLeft: "5%",
                  width: "35vh",
                }}
              >
                <CiSearch
                  style={{
                    fontSize: "55px",
                    color: "#ffc700",
                    marginTop: "1%",
                  }}
                />
                <a
                  href="#"
                  style={{
                    fontSize: "24px",
                    marginTop: "1%",
                    width: "35vh",
                    paddingTop: "5%",
                    height: "7vh",
                  }}
                >
                  Search
                </a>
              </li>

              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "3%",
                  paddingLeft: "5%",
                  width: "35vh",
                  marginBottom: "35%",
                }}
              >
                <IoMdSave
                  style={{
                    fontSize: "55px",
                    color: "#ffc700",
                    marginTop: "1%",
                  }}
                />
                <a
                  href="#"
                  style={{
                    fontSize: "24px",
                    marginTop: "1%",
                    width: "35vh",
                    paddingTop: "5%",
                    height: "7vh",
                  }}
                >
                  Saved
                </a>
              </li>

              <hr
                style={{
                  backgroundColor: "#ffc700",
                  width: "35vh",
                  height: "5px",
                  border: "none",
                }}
              />
              <div
                className="pl-3"
                style={{ textAlign: "center", display: "flex" }}
              >
                <a href="#">
                  {" "}
                  &nbsp;&nbsp;&nbsp;
                  <TbLogout
                    className="zoom-button"
                    style={{
                      fontSize: "350%",
                      color: "#ffc700",
                      margintLeft: "40%",
                    }}
                  />
                </a>
                <a href="#" style={{ marginTop: "16%", paddingLeft: "3%" }} onClick={() => { logout(); window.location.href = '/'; }}>
                  <h6 style={{ paddingTop: "9%", fontSize: "20px" }}>Logout</h6>
                </a>
              </div>



      <div className="ml-10 mt-10 text-yellow-400 text-xl" style={{cursor:"pointer"}} onClick={toggleModal}>
        + Add Post
      </div>
      <CreatepostModal isOpen={modalIsOpen} toggle={toggleModal} />



            </ul>
          </div>
          {/* <!-- /#sidebar-wrapper --> */}
        </div>
      </body>
    </>
  );
};

export default Usersidebar;
