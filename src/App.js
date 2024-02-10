import "./App.css";
import Login from "./components/Loginbox/Login";
import Signup from "./components/Signupbox/Signup";
import Adminlogin from "./components/Adminloginbox/Adminlogin";
import Userhome from "./components/Userhome/Userhome";
import Userprofile from "./components/Userprofile/Userprofile";
import AdminDash from "./components/Admindashboard/AdminDash";
import Otp from "./components/Otp/Otp";
import Postcommentsection from "./components/Postcommentsection/Postcommentsection";
import UserStatusChecker from "./components/Userstatus";
import DeleteUnregisteredUsers from "./components/Deleteunregisteredusers";
import Spinner from "./components/Spinner";
import Saveditems from "./components/Saveditems/Saveditems";
import Chat from "./components/Chat/Chat";
import Othersprofile from "./components/Othersprofile/Othersprofile";
import PeopleYouMayKnow from "./components/PeopleYouMayKnow/PeopleYouMayKnow"
import Savedposts from "./components/Savedposts/Savedposts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    
    <Router>
      <ToastContainer/>
      <UserStatusChecker/>
      <DeleteUnregisteredUsers/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/home" element={<Userhome />} />
        <Route path="/userprofile" element={<Userprofile/>} />
        <Route path="/othersprofile/:author_email" element={<Othersprofile/>} />
        <Route path="/admindashboard" element={<AdminDash/>} />
        <Route path="/otp" element={<Otp/>} />
        <Route path="/comment/:postid" element={<Postcommentsection/>} />
        <Route path="/spinner" element={<Spinner />} />
        <Route path="/saved" element={<Saveditems />} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/peopleyoumayknow" element={<PeopleYouMayKnow/>} />
         <Route path="/savedposts" element={<Savedposts/>} />

        Savedposts
       
        
      </Routes>
    </Router>
  );
}

export default App;
