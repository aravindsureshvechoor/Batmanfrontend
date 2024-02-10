import React,{useState,useEffect} from "react";
import "./Usersidebar.css";
import { TbLogout } from "react-icons/tb";
import { CiHome } from "react-icons/ci";
import { IoMdSave } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlineContactMail } from "react-icons/md";
import CreatepostModal from '../Createpost/CreatepostModal';
import {useDispatch,useSelector} from 'react-redux';
import { clearAuth } from '../../Redux/UserSlice';
import Spinner from "../Spinner";
import Modal from 'react-bootstrap/Modal';
import getNotificationsApi from '../getnotificationsAPI'
import notificationseenApi from '../notificationseenAPI'
import { useNavigate } from "react-router-dom";


const Usersidebar = () => {
   const [modalIsOpen, setModalIsOpen] = useState(false)
   const [loading, setLoading] = useState(true);
   const user = useSelector((state) => state.user);
   const [lgShow, setLgShow] = useState(false);
   const navigate = useNavigate();
    useEffect(() => {
      const fakeAPICall = setTimeout(() => {
        setLoading(false); 
      }, 5800); 

      return () => clearTimeout(fakeAPICall);
    }, []); 

 const toggleModal = () => {
    setModalIsOpen(!modalIsOpen)
 }

const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAuth());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
  };

  // N  O  T  I  F  I  C  A  T  I  O  N       A  P  I 
  const [notification, setNotification] = useState([]);
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const toggleNotification = () => {
                                      setNotificationVisible(!isNotificationVisible);
                                    };
  const removeNotification = (notificationIdToRemove) => {
    setNotification((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationIdToRemove
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotificationsApi();
        setNotification(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const accessToken = localStorage.getItem("accessToken");
      const websocketProtocol =
        window.location.protocol === "https:" ? "wss://" : "ws://";
      const wsURL = `ws://localhost:8000/ws/notification/?token=${accessToken}`
      const socket = new WebSocket(wsURL);
      console.log(wsURL);

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "notification") {
          // Update the notification state with the new notification
          setNotification((prevNotifications) => [
            ...prevNotifications,
            data.payload,
          ]);
        } 
      };

      socket.onclose = (event) => {
        console.log("WebSocket connection closed", event);
      };
      return () => {
        socket.close();
      };
    }
  }, [user]);

  const getNotificationMessage = (notification) => {
    const { notification_type, post, comment } = notification;

    if (post) {
      if (notification_type === "like") {
        return "liked your post";
      } else if (notification_type === "comment") {
        return "commented on your post";
      } else if (notification_type === "post") {
        return "created a new post";
      } else if (notification_type === "blocked") {
        return "blocked you post";
      }
    } else if (comment) {
      if (notification_type === "comment") {
        return "replied to your comment";
      }
    }

    return "has started following you";
  };
const onClick = async (note) => {
    try {
      await notificationseenApi(note.id);
      removeNotification(note.id);
      toggleNotification();

      if (note.from_user) {
        if (note.notification_type === "like" && note.post) {
          // Redirect to the liked post page
          navigate(`/comment/${note.post}`);
        } else if (note.notification_type === "comment" && note.post) {
          // Redirect to the commented post page
          navigate(`/comment/${note.post}`);
        } else if (note.notification_type === "post" && note.post) {
          // Redirect to the new post page
          navigate(`/comment/${note.post}`);
        } else if (note.notification_type === "blocked") {
          // Redirect to a special "blocked" page
          // navigate(`/blocked`);
        } else {
          // Default redirection (e.g., profile or a general landing page)
          navigate(`/othersprofile/${note.from_user.email}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = (e) => {
    if (e.target.id === "wrapper") toggleNotification();
  };
  // N  O  T  I  F  I  C  A  T  I  O  N  E  N  D  S  H  E  R  E

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
{/* NOTIFICATION AND ITS MODALS STARTS HERE  */}
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
                 onClick={() => setLgShow(true)}
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
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header className="bg-yellow-400 h-5 text-black"  closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Notifications
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black text-yellow-400" >



<ul
          className="absolute left-auto right-0 z-[10] float-left m-0 mt-10 min-w-max list-none overflow-hidden rounded-lg border-none bg-black text-[#ffc700] bg-clip-padding text-left text-base shadow-lg [&[data-te-dropdown-show]]:block"
          aria-labelledby="dropdownMenuButton1"
          data-te-dropdown-menu-ref
        >
          {notification && notification.length > 0 ? (
            notification.map((note, index) => (
              <li key={index}>
                <p
                  className="mt-4 w-[700px] cursor-pointer"
                  onClick={() => onClick(note)}
                  data-te-dropdown-item-ref
                >
                  {note.notification_type === "blocked"
                    ? "Admin blocked your post"
                    : `${note.from_user.first_name} ${
                        note.from_user.last_name
                      } ${getNotificationMessage(note)}`}
                </p>
              </li>
            ))
          ) : (
            <li>
              <p className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm public hover:bg-neutral-100 active:no-underline">
                No notifications
              </p>
            </li>
          )}
        </ul>




        </Modal.Body>
      </Modal>
    </>

{/* NOTIFICATION AND ITS MODALS ENDS HERE  */}



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
                  href="/savedposts"
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
