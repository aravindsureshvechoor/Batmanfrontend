import React,{useState} from "react";
import "./Adminsidebar.css";
import { TbLogout } from "react-icons/tb";
import { CiHome } from "react-icons/ci";
import { GiEgyptianProfile } from "react-icons/gi";
import {useDispatch} from 'react-redux';
import { clearAdminAuth } from '../../Redux/AdminSlice';




const Adminsidebar = () => {
const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAdminAuth());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/admin';
  };

  
  return (
    <>
      <body>
        <div id="wrapper" className="xl:block hidden">
          {/* <!-- Sidebar --> */}
          <div id="sidebar-wrapper" style={{ width: "40vh" }}>
            <ul className="sidebar-nav">
              <li className="sidebar-brand">
                  <img
                    src="https://e1.pxfuel.com/desktop-wallpaper/476/446/desktop-wallpaper-batman-logo-yellow-dark-hero-art-iphone-batman-black-logo-android.jpg"
                    alt="logo"
                    className="w-[100px] h-[200px] pt-1 ml-[125px] pb-14 custom-scale-80"
                  />
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
                  href="/admindashboard"
                  style={{
                    fontSize: "24px",
                    marginTop: "1%",
                    width: "40vh",
                    paddingTop: "5%",
                    height: "7vh",
                  }}
                >
                  Users
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
                  href="/postmanage"
                  style={{
                    fontSize: "24px",
                    marginTop: "1%",
                    width: "40vh",
                    paddingTop: "5%",
                    height: "7vh",
                  }}
                >
                  Posts
                </a>
              </li>

              {/* <li
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
              </li> */}

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
                <a href="#" style={{ marginTop: "16%", paddingLeft: "3%" }} onClick={() => { logout(); window.location.href = '/admin'; }}>
                  <h6 style={{ paddingTop: "9%", fontSize: "20px" }}>Logout</h6>
                </a>
              </div>



      



            </ul>
          </div>
          {/* <!-- /#sidebar-wrapper --> */}
        </div>
      </body>
    </>
  );
};

export default Adminsidebar;
