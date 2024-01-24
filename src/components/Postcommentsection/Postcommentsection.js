import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/api';
import { baseURL } from '../../api/api';
import { SlLike } from "react-icons/sl";


const Postcommentsection = () => {

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


  const [posts,setPosts] = useState([]);
  const [comments,setComments] = useState([]);

  // console.log(user.user.id,"##################################")
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have an axios instance named axiosInstance
        const response = await axiosInstance.get(`${baseURL}/api/posts/singlepostforcomment/${postid}/`);
        console.log("POSTS : ", response.data)
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // Fetch posts when the component mounts
    fetchData();
  }, []);

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



  return (
    <>
    <div className="flex justify-between items-center">
  {/* //////////////////////////////// POSTDETAILS //////////////////////////////////// */}



     
    <div>
        <div className="flex justify-between items-center">
          
        </div>
   <span className="text-lg font-bold text-9a9a9a text-left ml-14 ">
            {posts.caption}
        </span>
<img className="2xl:h-[600px] h-full w-full object-cover transform scale-90" src={`http://localhost:8000/${posts.post_img}`}  alt="image description"/>
        
        
        {/* <div className="flex items-center">
        <SlLike  className="ml-14 zoom-button w-10 h-10 text-yellow-500"/>
        <h6 className="ml-3 text-gray-400">{posts.total_likes}</h6>
        </div> */}
        </div>


    {/* //////////////////////////////// POSTDETAILS //////////////////////////////////// */}





    

    {/* //////////////////////////////// COMMENTBOX //////////////////////////////////// */}


<div className="comment-container h-[900px] w-[800px] mt-[50px] mr-[60px]"style={{ backgroundColor: '#000000' }}>
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