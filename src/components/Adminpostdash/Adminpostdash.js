import React,{useState,useEffect} from 'react'
import axiosInstance, { baseURL } from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Adminpostdash = () => {

    

    const blockPost = async (postId) => {
      try {
        await axiosInstance.post(`${baseURL}/api/posts/postblock/${postId}/`);
        console.log(`Post blocked successfully.`);
        toast.success(`Post blocked successfully`);
      } catch (error) {
        console.error('Error blocking post:', error);
      }
    };

const unblockPost = async (postId) => {
      try {
        await axiosInstance.post(`${baseURL}/api/posts/postunblock/${postId}/`);
        console.log(`unblocked successfully.`);
        toast.success(`Unblocked successfully`);
      } catch (error) {
        console.error('Error unblocking post:', error);
      }
    };
    
    const [postdata,setPosData] = useState(null);

    useEffect(() => {
    const fetchPostData = async () => {
      try {
        // Replace 'yourUserAPIEndpoint' with the actual endpoint for user details
        const response = await axiosInstance.get(`${baseURL}/api/posts/getreportedposts/`);
        console.log(response.data)
        setPosData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Fetch user details when the component mounts
    fetchPostData();
  }, []);

console.log("Post Data : ", postdata)


  return (
    <>
    
    <table class="min-w-[1500px] ml-[390px] mt-12 bg-white rounded-md shadow overflow-hidden">
    <thead class="bg-gray-50">
        <tr>
            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">Post ID</th>
            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">Author</th>
            {/* <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">No.of Reports</th> */}
            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">Action</th>
        </tr>
    </thead>
    <tbody>
      { postdata&& postdata.map(post => (
        <tr style={{backgroundColor:"#000000"}}>
            <td class="px-6 py-4 text-sm font-medium text-white whitespace-nowrap">{post.id}</td>
            <td class="px-6 py-4 text-sm text-white whitespace-nowrap">{post.author_email}</td>
            {/* <td class="px-6 py-4 text-sm text-white whitespace-nowrap">{post.reports_count}</td> */}
            <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">

        { post.is_blocked?
                (<button onClick={() => unblockPost(post.id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Unblock Post
                    <ToastContainer />
                </button>):


                (<button onClick={() => blockPost(post.id)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Block Post
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

export default Adminpostdash