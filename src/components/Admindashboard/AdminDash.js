import React from 'react'
import { useDispatch } from 'react-redux';
import { clearAdminAuth } from '../../Redux/AdminSlice'; // Update the path accordingly



  

const AdminDash = () => {

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearAdminAuth());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Perform other logout-related tasks, e.g., navigating the user to the login page
    window.location.href = '/admin';
  };

  return (
    <>AdminDash
     <button onClick={logout}>
      Logout
    </button>
    </>
  )
}

export default AdminDash