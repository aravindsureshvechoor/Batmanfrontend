import "./App.css";
import Login from "./components/Loginbox/Login";
import Signup from "./components/Signupbox/Signup";
import Adminlogin from "./components/Adminloginbox/Adminlogin";
import Userhome from "./components/Userhome/Userhome";
import Userprofile from "./components/Userprofile/Userprofile";
import AdminDash from "./components/Admindashboard/AdminDash";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/home" element={<Userhome />} />
        <Route path="/userprofile" element={<Userprofile/>} />
        <Route path="/admindashboard" element={<AdminDash/>} />
      </Routes>
    </Router>
  );
}

export default App;
