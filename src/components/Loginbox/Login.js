import React,{useState}from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '../../Redux/UserSlice';
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
import { baseURL } from '../../api/api';

function UserLogin() {


  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');



  const changeEmail = (event) => {
      const emailValue = event.target.value;
      setEmail(emailValue);
      console.log("-----"+email)
    
      if (!isValidEmail(emailValue)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    };
    

    // Email validation function
    const isValidEmail = (email) => {
      // You can use a regular expression or any other method for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };


  const changePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

const handleLogin = (event) => {
    event.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      if (email.trim() === '') {
        setEmailError('Email is required');
      }
      if (password.trim() === '') {
        setPasswordError('Password is required');
      }
    } else {
      console.log('##########################',email)
          console.log('##########################',password)
      axios
        .post(`${baseURL}/api/authentication/userlogin/`, {
          email: email,
          password: password,
        }, { withCredentials: true })
        .then((response) => {
          console.log('RESPOSNE DATA:',response.data)
          localStorage.setItem('accessToken', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);
          console.log("response.data", response.data);
          console.log(response.data);
          dispatch(setAccessToken(response.data.data));
          dispatch(setUser(response.data.user));
          

          // Redirect to the desired page after successful login
          toast.success('Login Successful');
          navigator('/home');
        })
        .catch((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            // Unauthorized: Invalid credentials
              setPasswordError(error.response.data.password || 'Bad Credentials!!!');
          } else {
            // Other errors
            console.error('Login error:', error);
          }
        });
    }
    };



  return (
    <MDBContainer fluid style={{backgroundImage:'url("https://getwallpapers.com/wallpaper/full/b/f/e/1488318-beautiful-batman-art-wallpaper-1920x1080-1080p.jpg")',height:'100vh'}}>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='text-white my-5 mx-auto' style={{borderRadius: '1rem',border: '1px solid #9a9a9a', maxWidth: '500px',height:'700px',backgroundColor:'#000000'}}>
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
    <input type="email" value={email} onChange={changeEmail} className={`form__field ${emailError ? 'error' : ''}`}
      placeholder="Email" name="email" id="email" required />
    <label htmlFor="email" className="form__label">Email</label>
  </div>
</div>
{emailError && <p className="error-message">{emailError}</p>}


<div style={{ display: 'flex', alignItems: 'center' , width:'100%'}}>
  <i className="fa fa-key icon" style={{ fontSize: '30px', color: '#9a9a9a', paddingTop: '5%',paddingRight:'2.5%' }}></i>
  <div style={{paddingLeft:'2%'}} className="form__group field form__group-icon">
    <input type="password" value={password} onChange={changePassword} className={`form__field ${passwordError ? 'error' : ''}`}
       placeholder="password" name="password" id="password" required />
    <label htmlFor="password" className="form__label">Password</label>
  </div>
</div>
{passwordError && <p className="error-message">{passwordError}</p>}

              <p style={{marginTop:'2%'}}className="small mb-3 pb-lg-2" ><a style={{fontSize:'18px'}} class="text-white-50" href="#!">Forgot password?</a></p>
              <MDBBtn outline onClick={handleLogin} className='mx-2 px-5' style={{backgroundColor:"#FFC700",color:'#000000', border:"none",marginTop:'3%'}} size='lg'>
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

export default UserLogin;