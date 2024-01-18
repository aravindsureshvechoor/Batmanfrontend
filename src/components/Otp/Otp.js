import React,{useState} from 'react'

const Otp = () => {

const [Otp,setOtp] = useState('')
const changeOtp = (event) => {
    setOtp(event.target.value);
  };



  return (
    <>
    
<div class="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
  <div class="relative bg-black px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div class="flex flex-col items-center justify-center text-center space-y-2">
        <div class="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div class="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email ba**@dipainhouse.com</p>
        </div>
      </div>

      <div>
        <form action="" method="post">
          <div class="flex flex-col space-y-16">
            <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                
            <input onChange={changeOtp} value={Otp} className="w-full h-14 text-center text-xl text-black-900 bg-gray-100" type="text" pattern="\d*" inputmode="numeric" maxLength="4" placeholder="Enter OTP" />



              
            </div>

            <div class="flex flex-col space-y-5">
              <div>
                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-yellow-400 border-none text-black text-sm shadow-sm">
                  Verify Account
                </button>
              </div>

              
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>/
    </>
  )
}

export default Otp