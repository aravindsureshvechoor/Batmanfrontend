import React, { useState,useEffect } from "react";
import axiosInstance, { baseURL } from '../../api/api';
import "./Userpost.css";
import { SlLike } from "react-icons/sl";
import { TfiComment } from "react-icons/tfi";
import Spinner from '../Spinner';
import { MdOutlineSaveAlt } from "react-icons/md";
// import { CiShare1 } from "react-icons/ci";
// import Icon from '@mdi/react';
// import { mdiThumbUp } from '@mdi/js';
import { useSelector } from "react-redux";

const Userpost = () => {



  const [loading,setLoading] = useState(false)
  const [posts,setPosts] = useState([]); 
  const user = useSelector((state) => state.user);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Assuming you have an axios instance named axiosInstance
        const response = await axiosInstance.get(`${baseURL}/api/posts/get/`);
        // console.log("POSTS : ", response.data)
        setPosts(response.data);
      } catch (error) {
        // console.error("Error fetching posts:", error);
      }
      finally {
    setLoading(false); // Set loading back to false after the request is completed (success or error)
    }
    };

    // Fetch posts when the component mounts
    fetchData();
  }, []);


// this function is for the likestatemanagement
const likePostApi = async (postId, fetchData) => {
  try {
    // const accessToken = localStorage.getItem('access_token');
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

/////////////////////////////////////////////////////////

 const handleToggleLikePost = async (postId, isLiked) => {
  try {
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
    await likePostApi(postId);

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
      <div className="w-[300px] sm:w-[660px] lg:w-[900px] xl:w-[1000px]  xl:ml-[500px] ml-20  pb-5 mt-5 bg-black text-white px-[10px]  m-[10px] rounded-lg xl:h-[800px] sm:h-[650px] lg:h-[750px] h-[400px] ">
        <div className="flex justify-between items-center">
          <img
            src="https://i.insider.com/648090713973bf001961daa1?width=1136&format=jpeg"
            alt="User Profile"
            className="w-[60px] h-[60px] rounded-full mt-4 "
          />
          <span className="text-lg font-bold text-9a9a9a text-left xl:pr-[800px] mt-4 lg:pr-[700px]">
            {post.author_first_name}
          </span>
          <a href="#" className="zoom-button text-yellow-500">
            <MdOutlineSaveAlt className="w-10 h-10" />
          </a>
        </div>

        <h5 className="xl:ml-20 ml-5 xl:mt-0 mt-2  text-lg font-serif">
          {post.caption}
        </h5>

   
<img className="2xl:h-[600px] h-full w-full object-cover transform scale-90" src={`http://localhost:8000/${post.post_img}`}  alt="image description"/>


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
              <h6 className="ml-6 mt-2  text-gray-400 ">0</h6>
            </a>
          </div>

          <span className="text-sm xl:mt-4 mt-2 text-gray-500">
            {post.created_at}
            
          </span>
        </div>
      </div>
      ))}
    </>
  );
};

export default Userpost;
