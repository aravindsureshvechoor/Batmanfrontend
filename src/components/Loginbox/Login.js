import React,{useState}from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Spinner from '../Spinner';
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

  

  

  const [loading,setLoading] = useState(false)

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUpClick = () => {
    navigator('/signup');
  };

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
    

    const isValidEmail = (email) => {
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
      
      setLoading(true)
      axios
        .post(`${baseURL}/api/authentication/userlogin/`, {
          email: email,
          password: password,
        }, { withCredentials: true })
        .then((response) => {
          console.log('RESPOSNE DATA:',response.data)
          setLoading(false)
          dispatch(setAccessToken({accessToken:response.data.data.access,refreshToken:response.data.data.refresh}));
          dispatch(setUser(response.data.user));
          toast.success('Login Successful');
          navigator('/home');
        })
        .catch((error) => {
          console.log(error.response.data)
          if (error.response.status === 'ERR_BAD_REQUEST') {
              toast.error(error.response.data.password)
          } 
          else if (error.response.data && error.response.data.Blocked) {
    
            toast.error(error.response.data.Blocked);
          } 
          else if (error.response.data && error.response.data["No active"]) {
            
            toast.error(error.response.data["No active"]);
          } 
          else if (error.response.data && error.response.data.Invalid) {
           
            toast.error(error.response.data.Invalid);}
          
          else {
            // Other errors
            console.error('Login error:', error);
          }
        })
        .finally(() => {
          setLoading(false); 
        });
    }
    };


if(loading){
  return <Spinner></Spinner>
}

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

              <p style={{marginTop:'2%'}}className="small mb-2 pb-lg-2" ><a style={{fontSize:'18px'}} class="text-white-50" href="#!">Forgot password?</a></p>
              <MDBBtn outline onClick={handleLogin} className='mb-2 mt-2 px-10' style={{backgroundColor:"#FFC700",color:'#000000', border:"none",marginTop:'3%'}} size='lg'>
                Login
              </MDBBtn>

               <GoogleOAuthProvider clientId="863926768719-05krrpimr8g0ietobt4rfgh03fmi88ri.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                      const decoded = jwtDecode(credentialResponse.credential);
                      

        setLoading(true)            
        axios.post(`${baseURL}/api/authentication/googleauth/`, {
          email: decoded.email,
          name: decoded.given_name,
          token: credentialResponse.credential,
        }, { withCredentials: true })
        .then((response) => {
          dispatch(setAccessToken({accessToken:response.data.data.access,refreshToken:response.data.data.refresh}));
          dispatch(setUser(response.data.user));
          
          setLoading(false)
          toast.success('Login Successful');
          navigator('/home');
        })
        .catch((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            console.log(error.response.data)
              setEmailError(error.response.data.password || 'Bad Credentials!!!');
          } else {
            console.error('Login error:', error);
          }
        })
        .finally(() => {
      setLoading(false); 
      });
        
        
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
              
                  />
            </GoogleOAuthProvider>
            {emailError && <p className="error-message">{emailError}</p>}
              <p className="mt-5">Don't have an account? <a onClick={handleSignUpClick} style={{cursor:"pointer"}} className="text-white-50 fw-bold">Sign Up</a></p>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default UserLogin;