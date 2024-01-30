import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/api';
import { baseURL } from '../../api/api';
import { SlLike } from "react-icons/sl";
import Spinner from '../Spinner';
import { useSelector } from "react-redux";
import { CiHome } from "react-icons/ci";
import { Link } from 'react-router-dom';

// ...






const Postcommentsection = () => {

  
  const [loading,setLoading] = useState(false)
  const [posts,setPosts] = useState([]); 
  const user = useSelector((state) => state.user);
  const params = useParams();
  const postid = params.postid
  const [comment,setComment] = useState('')
    const onchangeforcomment = (event) => {
        setComment(event.target.value);
    }

  const handlePostComment = async () => {
    try {
      
      const response = await axiosInstance.post(`${baseURL}/api/posts/comment/${postid}/`, {
        body: comment,
      });

      // Handle the response if needed
      console.log('Response from the server:', response.data);
      setComment('');
      window.location.href = `/comment/${postid}`;
    } catch (error) {
      // Handle errors
      console.error('Error making POST request:', error);
    }
  };


  
  const [comments,setComments] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have an axios instance named axiosInstance
        const response = await axiosInstance.get(`${baseURL}/api/posts/retrievecomments/${postid}/`);
        console.log("COMMENTS : ", response.data)
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    // Fetch posts when the component mounts
    fetchData();
  }, []);




// THE GIVEN BELOW ARE IMPORTED FROM USERPOST

 useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Assuming you have an axios instance named axiosInstance
        const response = await axiosInstance.get(`${baseURL}/api/posts/singlepostforcomment/${postid}/`);
        console.log("POSTS : ", response.data)
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

const handleToggleLikePost = async (postid,isLiked) => {
  try {
    // Assuming you have a single post in the 'posts' state
    // const post = posts;

    // Update the like count for the specific post locally
    const updatedPosts =()=> {
      if (posts.id === postid) {
        return {
          ...posts,
          likes: isLiked
            ? posts.likes.filter((likeUserId) => likeUserId !== user.user.id)
            : [...posts.likes, user.user.id],
          total_likes: isLiked
            ? posts.total_likes - 1
            : posts.total_likes + 1,
        };
      }
      return posts;
    };

    // Update the UI with the locally modified data
    // This will make the button toggle instantly
    setPosts(updatedPosts);

    // Send the like/unlike request to the server
    await likePostApi(postid);

  } catch (error) {
    console.error(error);
  }
};


// IMPORTS FROM USERPOST ENDS HERE











if(loading){
  return <Spinner></Spinner>
}
  return (
    <>
              <Link to="/home" style={{ textDecoration: 'none' }}>
              <CiHome
                style={{
                  fontSize: '45px',
                  color: '#ffc700',
                  cursor: 'pointer',
                }}
              />
            </Link>
    <div className="flex justify-between items-center">


  {/* ///////////////////////////////////POST SECTION //////////////////////////////////// */}


      <div className="w-[1000px] h-[800px] ml-[90px] mb-[50px] bg-black text-white rounded-lg">
        <div className="flex justify-between items-center">
          <img
            src="https://i.insider.com/648090713973bf001961daa1?width=1136&format=jpeg"
            alt="User Profile"
            className="w-[60px] h-[60px] ml-4 rounded-full mt-4 "
          />
          
          <span className="text-lg font-bold text-9a9a9a text-left xl:pr-[800px] mt-12 mr-20 lg:pr-[700px]">
            {posts.author_first_name}&nbsp;{posts.author_last_name}
          </span>
          
        </div>

        <h5 className="xl:ml-20 ml-5 xl:mt-0 mt-2  text-lg font-serif">
          {posts.caption}
        </h5>

   
<img className="2xl:h-[600px] h-full w-full object-cover transform scale-90" src={`http://localhost:8000${posts.post_img}`}  alt="image description"/>


        <div className="flex justify-between">
          <div className="flex text-xl pb-12">

            {user.user && posts.likes && posts.likes.includes(user.user.id)?
            
            (
              <div className='flex'>
              <SlLike  className=" cursor-pointer zoom-button w-7 h-7 text-yellow-500 xl:ml-10 ml:4" onClick={() => handleToggleLikePost(posts.id, true)}/>
              <h6 className="ml-2 mt-2 text-gray-400">{posts.total_likes}</h6></div>
            )
            :

            (
              <div className='flex'>
              <SlLike  className="  cursor-pointer zoom-button w-7 h-7 text-gray-400 xl:ml-10 ml:4" onClick={() => handleToggleLikePost(posts.id, false)}/>
              <h6 className="ml-2 mt-2 text-gray-400">{posts.total_likes}</h6>
              </div>
            )
            }
           
                
              
          </div>

          <span className="text-sm xl:mt-4 mt-2 mr-6 text-gray-500">
            {posts.created_at}
            
          </span>
        </div>
      </div>
      


  {/* ///////////////////////////////////POST SECTION //////////////////////////////////// */}
    

    {/* /////////////////////////////////// COMMENTBOX ////////////////////////////////////// */}


<div className="comment-container h-[900px] w-[650px] mt-[50px] mr-[60px]"style={{ backgroundColor: '#000000' }}>
            {/* Display Comments */}
            {comments.map(c => (
              <div key='id' className="comment">
                <div className="comment-content">
                  <div className="comment-user">
                    <div>
                      <h3 className="font-bold text-xl ml-5 mt-3">{c.user_first_name}:</h3>
                      
                    </div>
                  </div>
                  
                  <p className="text-yellow-600 mt-2 text-lg ml-10">{c.body}</p>
                  
                  
                  {/* <button className="text-right text-blue-500">Reply</button> */}
                </div>

                {/* Display Replies
                {comment.replies && (
                  <div className="replies ml-6">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="reply">
                        <div className="reply-content">
                          <div className="reply-user">
                            <div>
                              <h3 className="font-bold">{reply.user}</h3>
                              
                            </div>
                          </div>
                          <p className="text-gray-600 mt-2">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}
              </div>))}
            

            {/* Comment Input */}
            <div className="w-full px-3 mb-2 mt-6">
              <input
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                name="body"
                value={comment}
                onChange={onchangeforcomment}
                placeholder="you can comment here ..."
                required
              ></input>
            </div>

            {/* Post Comment Button */}
            <div className="w-full flex justify-end px-3 my-3">
              <input
                onClick={handlePostComment}
                type="submit"
                className="px-2.5 py-1.5 rounded-md text-black text-sm bg-yellow-400 text-lg"
                value='Comment'
              />
            </div>
            
          </div>




    {/* //////////////////////////////// COMMENTBOX //////////////////////////////////// */}
    </div>
    </>
  )
}

export default Postcommentsection