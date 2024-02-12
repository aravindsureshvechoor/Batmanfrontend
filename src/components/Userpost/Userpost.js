import React, { useState,useEffect } from "react";
import axiosInstance, { baseURL } from '../../api/api';
import "./Userpost.css";
import { SlLike } from "react-icons/sl";
import { TfiComment } from "react-icons/tfi";
import Spinner from '../Spinner';
import { FiSave } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Deletepostmodal from "../Deletepostmodal/Deletepostmodal";
import Reportpostmodal from "../Reportpostmodal/Reportpostmodal";
const Userpost = () => {



  const [loading,setLoading] = useState(false)
  const [posts,setPosts] = useState([]); 
  const user = useSelector((state) => state.user);

// deletepostmodal states and functions
  const [modalIsOpen, setModalIsOpen] = useState(false)
    const toggleModal = () => {
    setModalIsOpen(!modalIsOpen)
 }
// deletepostmodal states and functions ends here

// Reportpostmodal states and functions
const [reportmodalIsOpen, setReportModalIsOpen] = useState(false)
    const toggleReportModal = () => {
    setReportModalIsOpen(!reportmodalIsOpen)
    }
// Reportpostmodal states and functions ends here


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get(`${baseURL}/api/posts/get/`);
        console.log("POSTS : ", response.data)
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      finally {
    setLoading(false); 
    }
    };
    fetchData();
  }, []);


// this function is for the likestatemanagement
const likePostApi = async (postId, fetchData) => {
  try {
    let body = {}
    const response = await axiosInstance.post(`${baseURL}/api/posts/like/${postId}/`,body);
    if (response.status === 200) {
      console.log('Post like toggled successfully');
      if (fetchData) {
        fetchData(); 
      }
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

// this function is to save post to users collection
const handleSave = async (postId) => {
  try {
    

    const response = await axiosInstance.post(`${baseURL}/api/posts/savepost/${postId}/`);
    if (response.status === 201) {
      toast.success("Saved");
      console.log(response.data);
    } else {
      console.log(response.statusText);
    }
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.error === "SavedPost already exists for this user and post.") {
      toast.info("Already saved");
    } else {
      // Handle other errors
      toast.error("An error occurred");
    }
  }
}


/////////////////////////////////////////////////////////

 const handleToggleLikePost = async (postId, isLiked) => {
  try {
    await likePostApi(postId);
    // Update the like count for the specific post locally
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: isLiked
            ? post.likes.filter((likeUserId) => likeUserId !== user.user.id)
            : [...post.likes, user.user.id],
          total_likes: isLiked
            ? post.total_likes - 1
            : post.total_likes + 1,
        };
      }
      return post;
    });

    // Update the UI with the locally modified data
    // This will make the button toggle instantly
    setPosts(updatedPosts);

    // Send the like/unlike request to the server
    // await likePostApi(postId);

  } catch (error) {
    console.error(error);
  }
};



if(loading){
  return <Spinner></Spinner>
}



  return (
    <>
     {posts.map(post => (
      <div className="w-[300px] sm:w-[660px] lg:w-[900px] xl:w-[1000px]  xl:ml-[400px] ml-20  pb-5 mt-5 bg-black text-white px-[10px]  m-[10px] rounded-lg xl:h-[800px] sm:h-[650px] lg:h-[750px] h-[400px] ">
        <div className="flex justify-between items-center">
          <img
            src={`http://localhost:8000${post.author_profile_image}`}
            alt="User Profile"
            className="w-[60px] h-[60px] rounded-full mt-4 "
          />
          <a href={`/othersprofile/${post.author_email}`} className="text-lg hover:text-yellow-400 text-gray-400 font-bold text-9a9a9a text-left xl:pr-[800px] mt-4 lg:pr-[700px]">
            {post.author_first_name}
          </a>
          <a href="#" className="zoom-button text-yellow-500">
            <FiSave onClick={() => handleSave(post.id)} className="w-10 h-10" />
          </a>
        </div>

        <h5 className="xl:ml-20 ml-5 xl:mt-0 mt-2  text-lg font-serif">
          {post.caption}
        </h5>

   <a href={`/comment/${post.id}`}>
<img className="2xl:h-[600px] h-full w-full object-cover transform scale-90 cursor-pointer" src={`http://localhost:8000${post.post_img}`}  alt="image description"/>
</a>

        <div className="flex justify-between">
          <div className="flex text-xl pb-12">

            {user.user && post.likes.includes(user.user.id)?
            
            (<a href="#">
              
              <SlLike  className=" zoom-button w-7 h-7 text-yellow-500 xl:ml-10 ml:4" onClick={() => handleToggleLikePost(post.id, true)}/>
              <h6 className="ml-11 mt-2 text-gray-400">{post.total_likes}</h6>
            </a>)
            :

            (<a href="#">
              
              <SlLike  className=" zoom-button w-7 h-7 text-gray-400 xl:ml-10 ml:4" onClick={() => handleToggleLikePost(post.id, false)}/>
              <h6 className="ml-11 mt-2 text-gray-400">{post.total_likes}</h6>
              
            </a>)
            }

            <a href={`/comment/${post.id}`} className=" zoom-button xl:ml-8 ml-0">
              <TfiComment className=" w-7 h-7 text-gray-400 ml-5 " />
            </a>
          </div>

          <span className="text-sm xl:mt-4 mt-2 text-gray-500">
            Date Posted :&nbsp;{new Date(post.created_at).toLocaleDateString()}
            
          </span>
          {(user.user && post.author_email && post.author_email !== user.user.email) ? (
            <>
  <a onClick={toggleReportModal} className="text-gray-500 mt-6 mr-2 cursor-pointer hover:text-gray-500 transition-transform duration-300 transform hover:scale-110">Report this post ?</a>
  <Reportpostmodal isOpen={reportmodalIsOpen} toggle={toggleReportModal} postId={post.id}/>
  </>
) : (
  <>
    <a onClick={toggleModal} className="text-gray-500 mt-6 mr-2 cursor-pointer hover:text-gray-500 transition-transform duration-300 transform hover:scale-110">Delete this post ?</a>
    <Deletepostmodal isOpen={modalIsOpen} toggle={toggleModal} postId={post.id}/>
  </>
)}

        </div>
      </div>
      ))}
    </>
  );
};

export default Userpost;
