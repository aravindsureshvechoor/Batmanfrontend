import React from 'react'

const Spinner = () => {
  return (
    <>
    
    <div class='flex flex-col items-center justify-center h-screen w-screen bg-black'>
  <div>
    <img
      src="https://e1.pxfuel.com/desktop-wallpaper/476/446/desktop-wallpaper-batman-logo-yellow-dark-hero-art-iphone-batman-black-logo-android.jpg"
      alt="logo"
      class="w-[100px] h-[150px] ml-2"
    />
    <div class='flex mb-6'>
      <div class='h-8 w-8 mx-1 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div class='h-8 w-8 mx-1 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div class='h-8 w-8 mx-1 bg-yellow-400 rounded-full animate-bounce'></div>
    </div>
  </div>
</div>
</>
  )
}

export default Spinner