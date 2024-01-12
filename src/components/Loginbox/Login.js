import React from 'react';
import  './Login.css'
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

function App() {
  return (
    <MDBContainer fluid style={{backgroundColor:'#131313',height:'100vh'}}>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px',height:'700px',backgroundColor:'#000000'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'style={{marginTop:'-5%'}}>
           <div className='h-90 flex flex-col items-center'>
           <img
                    src="https://e1.pxfuel.com/desktop-wallpaper/476/446/desktop-wallpaper-batman-logo-yellow-dark-hero-art-iphone-batman-black-logo-android.jpg"
                    alt="logo"
                    className="w-[80px] h-[160px]"
                  />
            {/* <span className='text-gray-400 text-sm text mb-22'>Batman</span> */}
          </div>

            <h2 style={{fontSize:'25px'}} className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>
            
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

              <p style={{marginTop:'2%'}}className="small mb-3 pb-lg-2" ><a style={{fontSize:'18px'}} class="text-white-50" href="#!">Forgot password?</a></p>
              <MDBBtn outline className='mx-2 px-5' style={{backgroundColor:"#FFC700",color:'#000000', border:"none",marginTop:'3%'}} size='lg'>
                Login
              </MDBBtn>
                
                <MDBBtn tag='a'  className='m-3' style={{ color: 'blue',backgroundColor:'#000000',marginBottom:'10%',}}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
            
              <p className="mb-0">Don't have an account? <a style={{fontSize:'20px'}} href="#!" class="text-white-50 fw-bold">Sign Up</a></p>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default App;