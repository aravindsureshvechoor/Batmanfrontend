import React from 'react';
import  './Adminlogin.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';

function Adminlogin() {
  return (
    <MDBContainer fluid style={{backgroundColor:'#131313',height:'100vh'}}>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px',height:'600px',backgroundColor:'#000000'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 style={{fontSize:'20px'}} className="fw-bold mb-2 text-uppercase">Admin Login</h2>
              <p className="text-white-50 mb-5">Admin can login here...</p>

<div style={{ display: 'flex', alignItems: 'center' , width:'100%'}}>
  <i className="fa fa-envelope icon" style={{ fontSize: '30px', color: '#9a9a9a', paddingTop: '5%',paddingRight:'2.5%' }}></i>
  <div style={{paddingLeft:'2%'}} className="form__group field form__group-icon">
    <input type="email" className="form__field" placeholder="Email" name="email" id="email" required />
    <label htmlFor="email" className="form__label">Email</label>
  </div>
</div>
<div style={{ display: 'flex', alignItems: 'center' , width:'100%'}}>
  <i className="fa fa-key icon" style={{ fontSize: '30px', color: '#9a9a9a', paddingTop: '5%',paddingRight:'2.5%' }}></i>
  <div style={{paddingLeft:'2%'}} className="form__group field form__group-icon">
    <input type="password" className="form__field" placeholder="password" name="password" id="password" required />
    <label htmlFor="password" className="form__label">Password</label>
  </div>
</div>

              <MDBBtn outline className='mx-2 px-5' style={{backgroundColor:"#FFC700",color:'#000000', border:"none",marginTop:'10%'}} size='lg'>
                Admin Login
              </MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Adminlogin;