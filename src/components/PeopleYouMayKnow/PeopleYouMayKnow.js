import React,{useEffect, useState} from 'react'
import axiosInstance from '../../api/api';
import { baseURL } from '../../api/api';
import Spinner from '../Spinner';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
const PeopleYouMayKnow = () => {

    const [userdata,setUserdata] = useState([])
    const [followStatus, setFollowStatus] = useState({});
    

    useEffect(()=>{
      const fetchuserdata = async () => {
        
        try{
        const response = await axiosInstance.get(`${baseURL}/api/authentication/peopleyoumayknow/`);
        setUserdata(response.data)
      }
        catch (error){
          console.error(error)
        }
        
      }
      fetchuserdata();
    },[]);

    const followuser = async (email)=>{
      setFollowStatus(prevStatus => ({
      ...prevStatus,
      [email]: !prevStatus[email]
    }));
      try{
        await axiosInstance.post(`${baseURL}/api/authentication/follow/${email}/`)
      }
      catch (error){
        console.error(error)
      }
    }




  return (
    <>
    <h5 className="mt-5 ml-20 text-yellow-400">People You May Know</h5>
     { userdata.map(user=>(
      <MDBContainer>
        <MDBRow className='w-[900px]'>
          <MDBCol md="9" lg="7" xl="5" className="mt-2">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4 h-[120px] bg-black">
                <div className="d-flex text-gray-400">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '70px', borderRadius: '10px' }}
                      src={`http://localhost:8000${user.profile_image}`}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <a href={`/othersprofile/${user.email}`} className='text-yellow-400'>
                    <MDBCardTitle>{user.first_name}&nbsp;{user.last_name}</MDBCardTitle>
                    </a>
                    <div className="d-flex pt-1">
  
                      <MDBBtn onClick={()=>followuser(user.email)} className="flex-grow-1">
                        {/* {isfollowing?'Following' : 'Follow'} */}
                        {followStatus[user.email] ? 'Following' : 'Follow'}
                        </MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>))}
    </>
  )
}

export default PeopleYouMayKnow