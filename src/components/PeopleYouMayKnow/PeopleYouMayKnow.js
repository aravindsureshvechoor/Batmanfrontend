import React,{useEffect} from 'react'
import axiosInstance from '../../api/api';
import { baseURL } from '../../api/api';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
const PeopleYouMayKnow = () => {

    useEffect(()=>{
      const fetchuserdata = async () => {
        try{
        const response = await axiosInstance.get(`${baseURL}/api/authentication/peopleyoumayknow/`);
      console.log((response.data),"userdaaaattttttttaaaaaaaa")}
        catch (error){
          console.error(error)
        }
      }
      fetchuserdata();
    },[]);

  return (
    <>
     
      <MDBContainer>
        <MDBRow className='w-[900px]'>
          <MDBCol md="9" lg="7" xl="5" className="mt-2">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4 h-[120px] bg-black">
                <div className="d-flex text-gray-400">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '70px', borderRadius: '10px' }}
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>Danny McLoan</MDBCardTitle>
                    
                    <div className="d-flex pt-1">
  
                      <MDBBtn className="flex-grow-1">Follow</MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default PeopleYouMayKnow