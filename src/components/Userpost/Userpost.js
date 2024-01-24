import React, { useState,useEffect } from "react";
import axiosInstance, { baseURL } from '../../api/api';
import "./Userpost.css";
import { SlLike } from "react-icons/sl";
import { TfiComment } from "react-icons/tfi";
import { MdOutlineSaveAlt } from "react-icons/md";
// import { CiShare1 } from "react-icons/ci";
// import Icon from '@mdi/react';
// import { mdiThumbUp } from '@mdi/js';
import { useSelector } from "react-redux";

const Userpost = () => {




  const [posts,setPosts] = useState([]);
  const [postId, setPostId] = useState(null); 
  const user = useSelector((state) => state.user);

  // console.log(user.user.id,"##################################")
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have an axios instance named axiosInstance
        const response = await axiosInstance.get(`${baseURL}/api/posts/get/`);
        console.log("POSTS : ", response.data)
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
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
    await likePostApi(postId);

    // Update the like count for the specific post
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: isLiked
            ? post.likes.filter((likeUserId) => likeUserId !== user.id)
            : [...post.likes, user.id],
          total_likes: isLiked
            ? post.total_likes - 1
            : post.total_likes + 1,
        };
      }
      return post;
    });

    // Set the updated posts state
    setPosts(updatedPosts);
  } catch (error) {
    console.error("Error toggling like:", error);
  }
};





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

        
        {/* <img
          // src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRdI-Nv-Uy-uBJJkIKQmdWhEFG6oy4lPIoBha2LOaMputUjw5-Ltnn3-SQqhymuDZtcQDaxS0wbUXf2Ko0"
          src={`http://localhost:8000/${post.post_img}`}
          alt="Post"
          className="w-[900px] lg:w-[800px] xl:w-[900px] max-h-[1000px] object-cover lg:ml-[30px] ml:[0px] rounded-8 mb-3 mt-3"
        /> */}
   
<img className="2xl:h-[600px] h-full w-full object-cover transform scale-90" src={`http://localhost:8000/${post.post_img}`}  alt="image description"/>


        <div className="flex justify-between">
          <div className="flex text-xl pb-12">

            {post.likes.includes(user.id)?
            
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
              <h6 className="ml-6 mt-2  text-gray-400 ">21</h6>
            </a>
            {/* <a href="#" className=" zoom-button xl:ml-8 ml-0">
              <CiShare1 className=" w-7 h-7 text-yellow-300 ml-5  mb-1" />
              <h6 className="ml-7 mt-2  text-gray-400 ">21</h6>
            </a> */}
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
