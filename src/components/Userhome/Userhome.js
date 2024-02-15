import React from "react";
import Usersidebar from "../Usersidebar/Usersidebar";
import Userpost from "../Userpost/Userpost";
import PeopleYouMayKnow from "../PeopleYouMayKnow/PeopleYouMayKnow"

const Userhome = () => {

  
  return (
    <>
       <div className='d-flex'>
    <div className='flex-grow-1'>
      <Usersidebar />
      <Userpost />
    </div>
    <div className="ml-12">
      <PeopleYouMayKnow />
    </div>
  </div>
    </>
  );
};

export default Userhome;
