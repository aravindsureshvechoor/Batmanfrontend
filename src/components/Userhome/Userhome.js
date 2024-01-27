import React from "react";
import Usersidebar from "../Usersidebar/Usersidebar";
import Userpost from "../Userpost/Userpost";
// import Spinner from "../Spinner";

const Userhome = () => {

  // const [loading, setLoading] = useState(true); // Initially set loading to true

  // useEffect(() => {
  //   const fakeAPICall = setTimeout(() => {
  //     setLoading(false); // Set loading to false after the data is "loaded"
  //   }, 2000); // Simulating a 2-second delay, replace with actual API call

  //   // Cleanup function to clear the timeout in case the component unmounts
  //   return () => clearTimeout(fakeAPICall);
  // }, []); 

//   if(loading){
//   return <Spinner></Spinner>
// }
  return (
    <>
      <Usersidebar />
      <Userpost />
    </>
  );
};

export default Userhome;
