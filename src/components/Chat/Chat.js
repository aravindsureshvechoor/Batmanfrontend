import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import Usersidebar from '../Usersidebar/Usersidebar';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import ContactListApi from '../ContactListApi';
import GetChatMessages from '../GetChatMessages';
import CreateChatRoomApi from '../CreateChatRoomApi';

const Chat = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [profiles, setProfiles] = useState([]);
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ContactListApi();
        setProfiles(result);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    let messageListener;
    if (ws) {
      messageListener = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };
      ws.addEventListener('message', messageListener);
    }
    return () => {
      if (ws) {
        ws.removeEventListener('message', messageListener);
      }
    };
  }, [ws]);

  const handleSendMessage = () => {
    if (ws && inputMessage.trim() !== "") {
      ws.send(JSON.stringify({ message: inputMessage }));
      setInputMessage("");
    }
  };
  
  const joinChatroom = async (userId) => {
    try {
      const data = await CreateChatRoomApi(userId);
      const accessToken = localStorage.getItem("accessToken");
      const websocketProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
      
      const wsUrl = `ws://localhost:8000/ws/chat/${data.id}/?token=${accessToken}`
      const newChatWs = new WebSocket(wsUrl);
      

      newChatWs.onopen = async () => {
        console.log("Chatroom WebSocket connection opened.");
        // Fetch previous messages when the WebSocket connection is opened
        const previousMessages = await GetChatMessages(data.id);
        setMessages(previousMessages);
        setProfiles((prevProfiles) => {
          return prevProfiles.map((profile) => {
            if (profile.id === data.id) {
              return { ...profile};
            }
            return profile;
          });
        });
      };
      newChatWs.onclose = () => {
        console.log("Chatroom WebSocket connection closed.");
        // You can perform any necessary cleanup here when the WebSocket connection is closed.
      };
      newChatWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
        // Handle incoming messages from the chatroom WebSocket
      };

      setWs(newChatWs);
    } catch (error) {
      console.error(error);
    }
    setSelectedProfile(userId)
  };
  
  return (
    <>

<Usersidebar/>




<MDBContainer fluid className="py-5 px-5 mt-12" style={{ marginLeft:'23%', backgroundColor: "#000000" , height:"100vh",width:"120vh" }}>
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">

          <MDBCard style={{backgroundColor:"#131313"}}>
            {profiles && profiles.length>0
            ? profiles.map((profile) => (
            <MDBCardBody onClick={() => joinChatroom(profile.id)}>
              <MDBTypography listUnStyled className="mb-0">
                <li
                  className="p-2 border-bottom"
                  style={{ backgroundColor: "#131313" }}
                >
                  <a href="#!" className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0 text-yellow-400">{profile.first_name}</p>
                      </div>
                    </div>
                  </a>
                </li>
                
              </MDBTypography>
            </MDBCardBody>))
            : null}
          </MDBCard>
        </MDBCol>

        <MDBCol md="6" lg="7" xl="8">
          <MDBTypography listUnStyled>
            {messages.map((message, index) =>
                message.sender_email === user.email ? (

            <li className="d-flex justify-content-between mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />
              <MDBCard style={{backgroundColor:"#131313"}}>
                <MDBCardHeader className="d-flex justify-content-between p-3">
                  <p className="fw-bold mb-0 text-yellow-400">Brad Pitt</p>
                  <p className="text-muted small mb-0">
                    <MDBIcon far icon="clock" /> {message.created} ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    {message.message ? message.message : message.content}
                  </p>
                </MDBCardBody>
              </MDBCard>
            </li>):
            (<li class="d-flex justify-content-between mb-4">
              <MDBCard className="w-100" style={{backgroundColor:"#131313"}}>
                <MDBCardHeader className="d-flex justify-content-between p-3">
                  <p class="fw-bold mb-0 text-yellow-400">Lara Croft</p>
                  <p class="text-muted small mb-0">
                    <MDBIcon far icon="clock" /> {message.created} ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0"  >
                    {message.message ? message.message : message.content}
                  </p>
                </MDBCardBody>
              </MDBCard>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                width="60"
              />
            </li>))}
            
            <li className=" mb-3" style={{backgroundColor:"#9a9a9a",borderRadius:"2%"}}>
              <MDBTextArea type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}  label="Message" id="textAreaExample" rows={4} />
            </li>
            <MDBBtn onClick={handleSendMessage} rounded color='none' className="float-end text-yellow-400">
              Send
            </MDBBtn>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>







    </>
  )
}

export default Chat