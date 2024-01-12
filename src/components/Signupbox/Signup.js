import React from 'react';
import  './Signup.css'
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

function Signup() {
  return (
    <MDBContainer fluid style={{backgroundColor:'#131313',height:'100vh'}}>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='text-white my-5 mx-auto' style={{borderRadius: '1rem',maxWidth: '540px',height:'810px',backgroundColor:'#000000'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
  
              

              <img
                    src="https://e1.pxfuel.com/desktop-wallpaper/476/446/desktop-wallpaper-batman-logo-yellow-dark-hero-art-iphone-batman-black-logo-android.jpg"
                    alt="logo"
                    className="w-[80px] h-[120px]"
                  />

              <h2 style={{fontSize:'20px'}} className="fw-bold text-uppercase">Signup</h2>
              <p className="text-white-50">New users can register here...</p>
              

              
              <div style={{ display: 'flex', alignItems: 'center' , width:'100%'}}>
                <i className="fa fa-user icon" style={{ fontSize: '30px', color: '#9a9a9a', paddingTop: '5%',paddingRight:'2.5%' }}></i>
                <div style={{paddingLeft:'2%'}} className="form__group field form__group-icon">
                  <input type="text" className="form__field" placeholder="firstname" name="firstname" id="firstname" required />
                  <label htmlFor="firstname" className="form__label">Firstname</label>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' , width:'100%'}}>
                <i className="fa fa-user icon" style={{ fontSize: '30px', color: '#9a9a9a', paddingTop: '5%',paddingRight:'2.5%' }}></i>
                <div style={{paddingLeft:'2%'}} className="form__group field form__group-icon">
                  <input type="text" className="form__field" placeholder="lastname" name="lastname" id="lastname" required />
                  <label htmlFor="lastname" className="form__label">Lastname</label>
                </div>
              </div>


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

              <div style={{ display: 'flex', alignItems: 'center' , width:'100%'}}>
                <i className="fa fa-lock icon" style={{ fontSize: '30px', color: '#9a9a9a', paddingTop: '5%',paddingRight:'3%' }}></i>
                <div style={{paddingLeft:'2%'}} className="form__group field form__group-icon">
                  <input type="password" className="form__field" placeholder="confirmpassword" name="confirmpassword" id="confirmpassword" required />
                  <label htmlFor="confirmpassword" className="form__label">Confirm Password</label>
                </div>
              </div>

               <div style={{ display: 'flex', alignItems: 'center' , width:'100%',marginTop:'7%'}}>
              <select
                    className="select select-bordered w-full max-w-xs"
                    style={{ backgroundColor: "#000000", color: "#ffc700" }}
                  >
                    <option disabled selected>
                      Select Your Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>

              </div>


              <MDBBtn outline className='mx-2 px-5' style={{backgroundColor:"#FFC700",color:'#000000', border:"none",marginBottom:'6%',margin:'5%'}} size='lg'>
                <h6 style={{marginTop:'10%'}}>Signup</h6>
              </MDBBtn>
              <p className="mb-0">Already have an account? <a style={{fontSize:'20px'}} href="#!" class="text-white-50 fw-bold">Sign In</a></p>

            </MDBCardBody>
          </MDBCard>,

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Signup;