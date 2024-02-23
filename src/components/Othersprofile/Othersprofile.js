import React,{useState,useEffect} from 'react'
import Usersidebar from '../Usersidebar/Usersidebar'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import './Othersprofile.css';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/api';
import { baseURL,imageBaseUrl } from '../../api/api';
import Userprofile from '../Userprofile/Userprofile';
import { useSelector } from 'react-redux';

const Othersprofile = () => {
    const [userdetails,setUserdetails] = useState([]);
    const [posts,setPosts] = useState([]);
    const user = useSelector((state) => state.user);
    const params = useParams();
    const email = params.author_email;
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers,setFollowers] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axiosInstance.get(`${baseURL}/api/authentication/retrieveuser/${email}/`);
        setUserdetails(response.data);
        
      } catch (error) {
        console.error(error)
      }
      
    };

    fetchData();
  }, [email]);

  useEffect(() => {
    const fetchfollowers = async () => {
      try{
      const response = await axiosInstance.get(`${baseURL}/api/authentication/following/`);
      const followerEmails = response.data.map(follower => follower.email);
      setFollowers(followerEmails);
      
      const isFollowingUser = followerEmails.includes(email);
      setIsFollowing(isFollowingUser);
      }
      catch (error) {
        console.error(error)
      }
    };

    fetchfollowers();
  },[]);


  const handleToggleFollow = async () => {
  try {
    
    const response = await axiosInstance.post(`${baseURL}/api/authentication/follow/${email}/`);

    if (response.status === 200) {
      setIsFollowing(!isFollowing)
      if(isFollowing){
        userdetails.follower_count-=1
      }
      else{
        userdetails.follower_count+=1
      }
    
    } else {
      console.error(`Failed to ${isFollowing ? 'unfollow' : 'follow'}:`, response.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};


  useEffect(() => {
    const fetchPostData = async () => {
      try {
        
        const response = await axiosInstance.get(`${baseURL}/api/authentication/retrieveuserpost/${email}/`);
        setPosts(response.data);
        
      } catch (error) {
        
      }
      
    };
    fetchPostData();
  }, [email]);



  if (user.user && user.user.email === email){
    return <Userprofile/>
  }

  return (
    <>
        <Usersidebar/>



        
      <MDBContainer className="py-5 h-100">
        <MDBRow className="h-100 2xl:w-[2000px]">
          <MDBCol lg="9" xl="7">
            <MDBCard className='bg-black 2xl:ml-32'>
              <div className="rounded-top text-gray-350 d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src={`${imageBaseUrl}${userdetails.profile_image}`}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />


                  <MDBBtn
                    outline
                    color="dark"
                    style={{ height: '36px', backgroundColor: '#000000', color: '#ffc700', overflow: 'visible' }}
                    onClick={handleToggleFollow}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </MDBBtn>

                  
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
    index % 2 === 0 && (
      <MDBRow key={index}>
         <MDBCol className="mb-2">
        <a href={`/comment/${post.id}`}>
          <MDBCardImage 
            src={`${imageBaseUrl}${post.post_img}`}
            alt={`image ${index + 1}`}
            className="rounded-3 h-[250px] w-[450px] cursor-pointer"
          />
        </a>
      </MDBCol>
        {index + 1 < posts.length && (
          <MDBCol className="mb-2">
          <a href={`/comment/${posts[index + 1].id}`}>
            <MDBCardImage
              src={`${imageBaseUrl}${posts[index + 1].post_img}`}
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

export default Othersprofile