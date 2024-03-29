import React,{useEffect} from "react";
import axios from "axios";
import { baseURL } from '../api/api';




const DeleteUnegisteredUsers=()=>{
    const checkUserStatus = async () => {
    try {
      const response = await axios.delete(`${baseURL}/api/deleteunregisteredusers/`);
      

    } catch (error) {
      console.error('Error checking user status:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkUserStatus, 600000);

    return () => clearInterval(intervalId);
  }, []);

  return null; 
};

export default DeleteUnegisteredUsers;