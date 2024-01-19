import React,{useState} from 'react';
import  './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
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

function Signup() {
    const navigator = useNavigate();
    

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState(''); 

    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [genderError, setGenderError] = useState('');

    const handleSignInClick = () => {
    // Use the navigate function to go to the '/' route
    navigator('/');
  };

    const changeFirstname = (event) => {
      setFirstname(event.target.value);
      console.log("-----"+firstname)
      setFirstnameError('');
    }

    const changeLastname = (event) =>{
      setLastname(event.target.value);
      console.log("-----"+lastname)
      setLastnameError('');
    }


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
      console.log("---"+password)
      setPasswordError('');
    }



    const changeConfirmPassword = (event) => {
      setConfirmPassword(event.target.value);
      console.log("-----"+confirmPassword)
      setPasswordError('');
    }

    const changeGender = (event) => {
      setGender(event.target.value);
      console.log("-------"+gender)
      setGenderError('');
    }
  
  const handleSubmit = (event) => {
      event.preventDefault();
      if (firstname.trim() === '' || lastname.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || email.trim() === '' || gender.trim() === '') {
          if (firstname.trim() === '') {
              setFirstnameError('First name is required');
          }
          if (lastname.trim() === '') {
              setLastnameError('Last name is required');
          }
          if (email.trim() === ''){
            setEmailError('Email is required')
          }
          
          if (password.trim() === '') {
              setPasswordError('Password is required');
          }
          if (confirmPassword.trim() === '') {
              setConfirmPasswordError('Confirm Your Password');
          }
          if (gender.trim() === ''){
            setGenderError('Please Select Your Gender')
          }
      } else if (password !== confirmPassword) {
          setConfirmPasswordError('Passwords do not match');
      }
      else {
          axios.post(`${baseURL}/api/authentication/signup/`, {
              first_name: firstname,
              last_name: lastname,
              email: email,
              password: password,
              gender:gender,
          }).then((response) => {
              // console.log(response.data.email)
              const usermail = response.data.email;
              localStorage.setItem('usermail',usermail)
              navigator('/otp');

          }).catch((error) =>{
              if (error.code === 'ERR_BAD_REQUEST'){
                  setEmailError(error.response.data.email ? error.response.data.email : '')
                  setPasswordError(error.response.data.password ? error.response.data.password : '')
                  setFirstnameError(error.response.data.firstname ? error.response.data.firstname : '')
              }
          });
      }
  }


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
                  <input type="text" value={firstname} onChange={changeFirstname} className={`form__field ${firstnameError ? 'error' : ''}`} placeholder="firstname" name="firstname" id="firstname" required />
                  <label htmlFor="firstname" className="form__label">Firstname</label>
                </div>
              </div>
              {firstnameError && <p className={'error-message'}>{firstnameError}</p>}

              <div style={{ display: 'flex', alignItems: 'center' , width:'100%'}}>
                <i className="fa fa-user icon" style={{ fontSize: '30px', color: '#9a9a9a', paddingTop: '5%',paddingRight:'2.5%' }}></i>
                <div style={{paddingLeft:'2%'}} className="form__group field form__group-icon">
                  <input type="text" value={lastname} onChange={changeLastname} className={`form__field ${lastnameError ? 'error' : ''}`} placeholder="lastname" name="lastname" id="lastname" required />
                  <label htmlFor="lastname" className="form__label">Lastname</label>
                </div>
              </div>
              {lastnameError && <p className={'error-message'}>{lastnameError}</p>}
        
              <div style={{ display: 'flex', alignItems: 'center' , width:'100%'}}>
                <i className="fa fa-envelope icon" style={{ fontSize: '30px', color: '#9a9a9a', paddingTop: '5%',paddingRight:'2.5%' }}></i>
                <div style={{paddingLeft:'2%'}} className="form__group field form__group-icon">
                  <input type="email" value={email} onChange={changeEmail} className={`form__field ${emailError ? 'error' : ''}`} placeholder="Email" name="email" id="email" required />
                  <label htmlFor="email" className="form__label">Email</label>
                </div>
              </div>
              {emailError && <p className={'error-message'}>{emailError}</p>}

              <div style={{ display: 'flex', alignItems: 'center' , width:'100%'}}>
                <i className="fa fa-key icon" style={{ fontSize: '30px', color: '#9a9a9a', paddingTop: '5%',paddingRight:'2.5%' }}></i>
                <div style={{paddingLeft:'2%'}} className="form__group field form__group-icon">
                  <input type="password" value={password} onChange={changePassword} className={`form__field ${passwordError ? 'error' : ''}`} placeholder="password" name="password" id="password" required />
                  <label htmlFor="password" className="form__label">Password</label>
                </div>
              </div>
              {passwordError && <p className={'error-message'}>{passwordError}</p>}


              <div style={{ display: 'flex', alignItems: 'center' , width:'100%'}}>
                <i className="fa fa-lock icon" style={{ fontSize: '30px', color: '#9a9a9a', paddingTop: '5%',paddingRight:'3%' }}></i>
                <div style={{paddingLeft:'2%'}} className="form__group field form__group-icon">
                  <input type="password" value={confirmPassword} onChange={changeConfirmPassword} className={`form__field ${confirmPasswordError ? 'error' : ''}`} placeholder="confirmpassword" name="confirmpassword" id="confirmpassword" required />
                  <label htmlFor="confirmpassword" className="form__label">Confirm Password</label>
                </div>
              </div>
              {confirmPasswordError && <p className={'error-message'}>{confirmPasswordError}</p>}


               <div style={{ display: 'flex', alignItems: 'center' , width:'100%',marginTop:'7%'}}>
              <select
                    className="select select-bordered w-full max-w-xs"
                    style={{ backgroundColor: "#000000", color: "#ffc700" }}
                    value={gender}
                    onChange={changeGender}
                  >
                    <option disabled selected>
                      Select Your Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>

              </div>
              {genderError && <p className={'error-message'}>{genderError}</p>}


              <MDBBtn outline onClick={handleSubmit} className='mx-2 px-5' style={{backgroundColor:"#FFC700",color:'#000000', border:"none",marginBottom:'6%',margin:'5%'}} size='lg'>
                <h6 style={{marginTop:'10%'}}>Signup</h6>
              </MDBBtn>
              <p className="mb-0">Already have an account? <a style={{fontSize:'20px'}} href="#!" onClick={handleSignInClick} class="text-white-50 fw-bold">Sign In</a></p>

            </MDBCardBody>
          </MDBCard>,

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Signup;