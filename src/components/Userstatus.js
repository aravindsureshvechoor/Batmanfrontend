import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth } from '../Redux/UserSlice';

const UserStatusChecker = () => {
  const user = useSelector((state) => state.user);
  const [userEmail, setUserEmail] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.user) {
      setUserEmail(user.user.email);
    }
  }, [user]);

  const logout = () => {
    dispatch(clearAuth());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
  };

  const checkUserStatus = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/authentication/userstatus/${userEmail}/`);
      const status = response.data;

      if (status && status.BLOCKED) {
        console.log('User is blocked. Logging out...');
        logout();
      } else if (status && status.NOTBLOCKED) {
        console.log('User is not blocked.');
      } else {
        console.warn('Unexpected response format:', status);
      }
    } catch (error) {
      console.error('Error checking user status:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkUserStatus, 60000);

    return () => clearInterval(intervalId);
  }, [userEmail, dispatch]);

  return null;
};

export default UserStatusChecker;
