import React,{useState,useEffect} from 'react'
import axiosInstance, { baseURL } from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Adminuserdash = () => {

    const blockUser = async (userId) => {
      try {
        // Replace 'yourApiEndpoint' with the actual API endpoint for blocking a user
        await axiosInstance.post(`${baseURL}/api/blockuser/${userId}/`);
        console.log(`User ${userId} blocked successfully.`);
        // Add any additional logic you want to perform after blocking the user
        toast.success(`User ${userId} blocked successfully`);
      } catch (error) {
        console.error('Error blocking user:', error);
      }
    };

const unblockUser = async (userId) => {
      try {
        // Replace 'yourApiEndpoint' with the actual API endpoint for unblocking a user
        await axiosInstance.post(`${baseURL}/api/unblockuser/${userId}/`);
        console.log(`unblocked successfully.`);
        // Add any additional logic you want to perform after unblocking the user
        toast.success(`unblocked successfully`);
      } catch (error) {
        console.error('Error unblocking user:', error);
      }
    };
    
    const [userdata,setUserData] = useState(null);

    useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace 'yourUserAPIEndpoint' with the actual endpoint for user details
        const response = await axiosInstance.get(`${baseURL}/api/authentication/userdetailsforadmin/`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Fetch user details when the component mounts
    fetchUserData();
  }, []);

console.log("User Data : ", userdata)


  return (
    <>
    
    <table class="min-w-[1500px] ml-[390px] mt-12 bg-white rounded-md shadow overflow-hidden">
    <thead class="bg-gray-50">
        <tr>
            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">ID</th>
            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">First Name</th>
            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">Last Name</th>
            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">Email</th>

            {/* <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">Status</th> */}

            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">Action</th>
        </tr>
    </thead>
    <tbody>
      { userdata&& userdata.map(user => (
        <tr style={{backgroundColor:"#000000"}}>
            <td class="px-6 py-4 text-sm font-medium text-white whitespace-nowrap">{user.id}</td>
            <td class="px-6 py-4 text-sm text-white whitespace-nowrap">{user.first_name}</td>
            <td class="px-6 py-4 text-sm text-white whitespace-nowrap">{user.last_name}</td>
            <td class="px-6 py-4 text-sm text-white whitespace-nowrap">{user.email}</td>

            {/* <td class="px-6 py-4 text-sm text-white whitespace-nowrap">{user.is_blocked}</td> */}

            <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">

        { user.is_blocked?
                (<button onClick={() => unblockUser(user.id)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Unblock
                    <ToastContainer />
                </button>):


                (<button onClick={() => blockUser(user.id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Block
                    <ToastContainer />
                </button>)}

            </td>
        </tr>
        ))}
    </tbody>
</table>   

    </>
  )
}

export default Adminuserdash