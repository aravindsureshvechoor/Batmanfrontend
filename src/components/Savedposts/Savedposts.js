import React,{useEffect,useState} from 'react'
import axiosInstance from '../../api/api';
import { baseURL } from '../../api/api';
import Usersidebar from '../Usersidebar/Usersidebar';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';



const Savedposts = () => {

    const [posts,setPosts] = useState([]);
    useEffect(() => {
    const fetchPostData = async () => {
      try {
        
        const response = await axiosInstance.get(`${baseURL}/api/posts/retrievesavedposts/`);
        console.log(response.data)
        setPosts(response.data);
        
      } catch (error) {
        
      }
      
    };

    // Fetch posts when the component mounts
    fetchPostData();
  });


  return (
    <>
    <Usersidebar/>
    <MDBContainer>
  {posts.map((post, index) => (
    // Check if the current index is divisible by 2 to determine the start of a new row
    index % 2 === 0 && (
      <MDBRow key={index}>
        {/* Display the current image */}
         <MDBCol className="mb-2">
        <a href={`/comment/${post.id}`}>
          <MDBCardImage 
            src={`http://localhost:8000${post.post_img}`}
            alt={`image ${index + 1}`}
            className="rounded-3 h-[250px] w-[450px] cursor-pointer"
          />
        </a>
      </MDBCol>

        {/* Check if there is another image in the array for the second column */}
        {index + 1 < posts.length && (
          <MDBCol className="mb-2">
          <a href={`/comment/${posts[index + 1].id}`}>
            <MDBCardImage
              src={`http://localhost:8000${posts[index + 1].post_img}`}
              alt={`image ${index + 2}`}
              className="rounded-3 h-[250px] w-[450px] cursor-pointer"
            />
          </a>
        </MDBCol>
        )}
      </MDBRow>
    )
  ))}
</MDBContainer></>
  )
}

export default Savedposts