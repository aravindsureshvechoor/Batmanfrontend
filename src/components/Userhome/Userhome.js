import React from "react";
import Usersidebar from "../Usersidebar/Usersidebar";
import Userpost from "../Userpost/Userpost";
import PeopleYouMayKnow from "../PeopleYouMayKnow/PeopleYouMayKnow"
// import Spinner from "../Spinner";

const Userhome = () => {

  
  return (
    <>
       <div className='d-flex'>
    <div className='flex-grow-1'>
      <Usersidebar />
      <Userpost />
    </div>
    <div className="ml-12">
      <h5 className="mt-5 ml-20 text-yellow-400">People You May Know</h5>
      <PeopleYouMayKnow />
    </div>
  </div>
    </>
  );
};

export default Userhome;
