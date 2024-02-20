import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {setAdminAccessToken, setAdminUser} from '../../Redux/AdminSlice'
import  './Adminlogin.css'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { baseURL } from '../../api/api';
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

    const navigator = useNavigate();
    const dispatch = useDispatch();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const changeEmail = (event) =>{
        setEmail(event.target.value);
        setEmailError('');
    };


    const changePassword = (event) =>{
        setPassword(event.target.value);
        setPasswordError('');
    };

    const handleAdminLogin = (event) =>{
        event.preventDefault();

        if(email.trim() === '' || password.trim() === ''){
            if(email.trim() === ''){
                setEmailError('Email is required');
            }
            if(password.trim() === ''){
                setPasswordError('Password is required');
            }
        }else{
            axios.post(`${baseURL}/api/adminlogin/`, {
                email: email,
                password: password
            })
            .then((response)=>{
                dispatch(setAdminAccessToken({ accessToken: response.data.access,refreshToken:response.data.refresh }));
                dispatch(setAdminUser({ user: response.data.user }));
                toast.success('Admin Login Successful');  
                navigator('/admindashboard');
            })
            .catch((error)=>{
                if(error.code === 'ERR_BAD_REQUEST'){
                    setEmailError(error.response.data.password || 'Bad Credentials!!!');
                }else{
                    console.error('Admin Login Error:', error);
                }
            });
        }
    };












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
    <input type="email" value={email} onChange={changeEmail} className="form__field" placeholder="Email" name="email" id="email" required />
    <label htmlFor="email" className="form__label">Email</label>
  </div>
</div>
{emailError && <p className={'error-message'}>{emailError}</p>}


<div style={{ display: 'flex', alignItems: 'center' , width:'100%'}}>
  <i className="fa fa-key icon" style={{ fontSize: '30px', color: '#9a9a9a', paddingTop: '5%',paddingRight:'2.5%' }}></i>
  <div style={{paddingLeft:'2%'}} className="form__group field form__group-icon">
    <input type="password" value={password} onChange={changePassword} className="form__field" placeholder="password" name="password" id="password" required />
    <label htmlFor="password" className="form__label">Password</label>
  </div>
</div>

              <MDBBtn outline className='mx-2 px-5' onClick={handleAdminLogin} style={{backgroundColor:"#FFC700",color:'#000000', border:"none",marginTop:'10%'}} size='lg'>
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