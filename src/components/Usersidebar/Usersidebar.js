import React,{useState} from "react";
import "./Usersidebar.css";
import { TbLogout } from "react-icons/tb";
import { CiHome } from "react-icons/ci";
import { GiBinoculars } from "react-icons/gi";
import { GiEgyptianProfile } from "react-icons/gi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { SiYourtraveldottv } from "react-icons/si";
import { MdOutlineContactMail } from "react-icons/md";
import CreatepostModal from '../Createpost/CreatepostModal';
import {useDispatch} from 'react-redux';
import { clearAuth } from '../../Redux/UserSlice';
// import axios from 'axios';
// import { baseURL } from '../../api/api';


const Usersidebar = () => {
   const [modalIsOpen, setModalIsOpen] = useState(false)

 const toggleModal = () => {
    setModalIsOpen(!modalIsOpen)
 }



// const navigate = useNavigate()

const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAuth());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Perform other logout-related tasks, e.g., navigating the user to the login page
    window.location.href = '/';
  };

  
  return (
    <>
      <body>
        <div id="wrapper" className="xl:block hidden">
          {/* <!-- Sidebar --> */}
          <div id="sidebar-wrapper" style={{ width: "40vh" }}>
            <ul className="sidebar-nav">
              <li className="sidebar-brand">
                {/* <a href="#" style={{ fontSize: "30px", width: "45vh" }}> */}
                  <img
                    src="https://e1.pxfuel.com/desktop-wallpaper/476/446/desktop-wallpaper-batman-logo-yellow-dark-hero-art-iphone-batman-black-logo-android.jpg"
                    alt="logo"
                    className="w-[100px] h-[200px] pt-1 ml-[125px] pb-14 custom-scale-80"
                  />
                {/* </a> */}
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "3%",
                  paddingLeft: "5%",
                  width: "40vh",
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
                  href="#"
                  style={{
                    fontSize: "24px",
                    marginTop: "1%",
                    width: "40vh",
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
                  width: "40vh",
                }}
              >
                <GiEgyptianProfile
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
                    width: "40vh",
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
                  width: "40vh",
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
                  href="#"
                  style={{
                    fontSize: "24px",
                    marginTop: "1%",
                    width: "40vh",
                    paddingTop: "5%",
                    height: "7vh",
                  }}
                >
                  Notifications
                </a>
              </li>

              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "3%",
                  paddingLeft: "5%",
                  width: "40vh",
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
                  href="#"
                  style={{
                    fontSize: "24px",
                    marginTop: "1%",
                    width: "40vh",
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
                  width: "40vh",
                }}
              >
                <GiBinoculars
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
                    width: "40vh",
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
                  width: "40vh",
                  marginBottom: "35%",
                }}
              >
                <SiYourtraveldottv
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
                    width: "40vh",
                    paddingTop: "5%",
                    height: "7vh",
                  }}
                >
                  Explore
                </a>
              </li>

              <hr
                style={{
                  backgroundColor: "#ffc700",
                  width: "40vh",
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
                      fontSize: "400%",
                      color: "#ffc700",
                      margintLeft: "40%",
                    }}
                  />
                </a>
                <a href="#" style={{ marginTop: "16%", paddingLeft: "3%" }} onClick={() => { logout(); window.location.href = '/'; }}>
                  <h6 style={{ paddingTop: "9%", fontSize: "20px" }}>Logout</h6>
                </a>
              </div>



      <div className="" onClick={toggleModal}>
        Create a new post
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
