import React,{useState,useEffect} from 'react'
import Usersidebar from '../Usersidebar/Usersidebar'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import './Userprofile.css'
import EditprofileModal from '../Editprofile/Editprofile';
import axiosInstance, { baseURL } from '../../api/api';
import { useSelector } from 'react-redux';

const Userprofile = () => {

const [userdetails,setUserdetails] = useState([]);
const [posts,setPosts] = useState([]);
const user = useSelector((state) => state.user);

// editprofilemodal states and funcitons
const [modalIsOpen, setModalIsOpen] = useState(false)
    const toggleModal = () => {
    setModalIsOpen(!modalIsOpen)
 }
//  editprofilemodalandfuncitonsendshere


useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axiosInstance.get(`${baseURL}/api/authentication/retrieveuser/${user.user.email}/`);
        console.log(response.data)
        setUserdetails(response.data);
        
      } catch (error) {
        
      }
      
    };

    // Fetch posts when the component mounts
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        
        const response = await axiosInstance.get(`${baseURL}/api/authentication/retrieveuserpost/${user.user.email}/`);
        console.log(response.data)
        setPosts(response.data);
        
      } catch (error) {
        
      }
      
    };

    // Fetch posts when the component mounts
    fetchPostData();
  }, []);

  return (
    <>
        <Usersidebar/>



        
      <MDBContainer className="py-5 h-100">
        <MDBRow className="h-100 2xl:w-[2000px]">
          <MDBCol lg="9" xl="7">
            <MDBCard className='bg-black 2xl:ml-32'>
              <div className="rounded-top text-gray-350 d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src={`http://localhost:8000${userdetails.profile_image}`}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />


                  <MDBBtn outline color="dark" onClick={toggleModal} style={{cursor:"pointer",height: '36px', backgroundColor:"#000000",color:"#ffc700",overflow: 'visible'}}>
                    Edit Profile
                  </MDBBtn>
                  <EditprofileModal isOpen={modalIsOpen} toggle={toggleModal} />


                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  
                  <MDBTypography tag="h5">{userdetails.first_name}&nbsp;{userdetails.last_name}</MDBTypography>
                </div>
              </div>
              <div className="p-4 mb-6 text-black" style={{ backgroundColor: '#ffc400' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">{userdetails.post_count}</MDBCardText>
                    <MDBCardText className="small text-black mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{userdetails.follower_count}</MDBCardText>
                    <MDBCardText className="small text-black mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{userdetails.following_count}</MDBCardText>
                    <MDBCardText className="small text-black mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                
                
                
    
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



</MDBContainer>

                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
        
        
    </>
  )
}

export default Userprofile