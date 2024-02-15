import React,{useState,useEffect} from "react";
import "./Usersidebar.css";
import { TbLogout } from "react-icons/tb";
import { CiHome } from "react-icons/ci";
import { BiCollection } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import CreatepostModal from '../Createpost/CreatepostModal';
import {useDispatch,useSelector} from 'react-redux';
import { clearAuth } from '../../Redux/UserSlice';
import Spinner from "../Spinner";
import Modal from 'react-bootstrap/Modal';
import getNotificationsApi from '../getnotificationsAPI'
import notificationseenApi from '../notificationseenAPI'
import { useNavigate } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import axios from "axios";
import { baseURL } from "../../api/api";


const Usersidebar = () => {
   const [modalIsOpen, setModalIsOpen] = useState(false)
   const [loading, setLoading] = useState(false);
   const user = useSelector((state) => state.user);
   const [lgShow, setLgShow] = useState(false);
   const[searchlgShow,setSearchLgShow] = useState(false);
   const navigate = useNavigate();

  // this portion deals with the state and search configuration , U S E R  S E A R C H
   const [searchquery,setSearchquery] = useState('');
   const [searchresult,setSearchresult] = useState([])

   const changeSearchquery = (event) => {
    const searchqueryvalue = event.target.value;
    setSearchquery(searchqueryvalue);
   }

   const handleSearchquery = async () =>{
    try{
      const response = await axios.get(`${baseURL}/api/authentication/usersearch/?query=${searchquery}`);
      setSearchresult(response.data)
    }
    catch(error){
      console.error(error);
    }
   }

  // user search and its configs ends here
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
          navigate(`/comment/${note.post}`);
        } else if (note.notification_type === "comment" && note.post) {
          navigate(`/comment/${note.post}`);
        } else if (note.notification_type === "post" && note.post) {
          navigate(`/comment/${note.post}`);
        } else if (note.notification_type === "blocked") {
        } else {
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
                  <img
                    src="https://e1.pxfuel.com/desktop-wallpaper/476/446/desktop-wallpaper-batman-logo-yellow-dark-hero-art-iphone-batman-black-logo-android.jpg"
                    alt="logo"
                    className="w-[90px] h-[200px] pt-1 ml-[110px] pb-14 custom-scale-80"
                  />
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
                <IoIosNotificationsOutline
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
                    display:'flex'
                  }}
                >
                  <span>Notifications</span>
                  {notification.length > 0 && (
                    <>
                      <h4 className="text-yellow-400">+{notification.length}</h4>
                    </>
                  )}
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
                  className="mt-4 w-[770px] cursor-pointer"
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
                <FiMessageSquare
                  style={{
                    fontSize: "50px",
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
                    marginLeft:'1%',
                    height: "7vh",
                  }}
                >
                  Messages
                </a>
              </li>
              

{/* S E A R C H  A N D  I T S  M O D A L  S T A R T S  H E R E  */}
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
                  onClick={() => setSearchLgShow(true)}
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
              
      <Modal
        size="md"
        show={searchlgShow}
        onHide={() => setSearchLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header className="bg-yellow-400 h-5 text-black"  closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Search a user
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#131313'}} className=" text-yellow-400" >



<div className="text-gray-300 p-4 shadow-lg max-w-2xl" style={{ background: '#131313', color: '#ffc700' }}>
  <div>
    <input
      type="text"
      placeholder="Search"
      value={searchquery} onChange={changeSearchquery}
      className="border border-indigo-500 p-1 px-4 font-semibold text-gray-200 ml-2 bg-indigo-500"
      style={{ background: '#ffffff', color: '#131313' }}
    />
    &nbsp;&nbsp;
    <button
      className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
      onClick={handleSearchquery}
      style={{ background: '#0056b3', color: '#000000' }}
    >
      Search
    </button>
    &nbsp;&nbsp;
  </div>
</div>
{/* USER DETAILS */}


{searchresult.length < 1 ? (
  <h6 className="text-gray-400 ml-[90px]">Nothing to show</h6>
) : (
  searchresult.map(user => (
    <MDBContainer key={user.id}> {/* Ensure to include a unique key for each element in the array */}
      <MDBRow className='w-[900px]'>
        <MDBCol md="9" lg="7" xl="5" className="mt-2">
          <MDBCard style={{ borderRadius: '15px' }}>
            <MDBCardBody className="h-[100px] bg-black">
              <div className="d-flex text-gray-400">
                <div className="flex-shrink-0">
                  <MDBCardImage 
                    style={{ width: '70px', borderRadius: '10px' }}
                    src={`http://localhost:8000${user.profile_image}`}
                    alt='Generic placeholder image'
                    fluid />
                </div>
                <div className="flex-grow-1 ms-3 mt-4">
                  <a href={`/othersprofile/${user.email}`} className='text-yellow-400'>
                    <MDBCardTitle>{user.first_name}&nbsp;{user.last_name}</MDBCardTitle>
                  </a>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  ))
)}

{/* USER DETAILS ENDS HERE */}
        </Modal.Body>
      </Modal>
    
{/* S E A R C H  A N D  I T S  M O D A L  E N D S  H E R E  */}

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
                <BiCollection
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
                <a href="#" style={{ marginTop: "16%", paddingLeft: "3%" }} onClick={() => { logout()}}>
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
