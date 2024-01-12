import React from "react";
import "./Userpost.css";
import { SlLike } from "react-icons/sl";
import { TfiComment } from "react-icons/tfi";
import { MdOutlineSaveAlt } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";

const Userpost = () => {
  return (
    <>
      <div className="w-[300px] sm:w-[660px] lg:w-[900px] xl:w-[1000px]  xl:ml-[500px] ml-20  pb-5 mt-4 bg-black text-white p-[20px] m-[10px] rounded-lg xl:h-[800px] sm:h-[650px] lg:h-[750px] h-[420px] ">
        <div className="flex justify-between items-center">
          <img
            src="https://i.insider.com/648090713973bf001961daa1?width=1136&format=jpeg"
            alt="User Profile"
            className="w-[60px] h-[60px] rounded-full  "
          />
          <span className="text-lg font-bold text-9a9a9a text-left xl:pr-[750px] lg:pr-[700px] mt-[15px] ">
            Leo Messi
          </span>
          <a href="#" className="zoom-button text-yellow-500">
            <MdOutlineSaveAlt className="w-10 h-10" />
          </a>
        </div>

        <h5 className="xl:ml-20 ml-5 xl:mt-0 mt-3 text-lg font-serif">
          Feliz de volver siempre 🇦🇷🔥🔥🔥
        </h5>
        <img
          src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRdI-Nv-Uy-uBJJkIKQmdWhEFG6oy4lPIoBha2LOaMputUjw5-Ltnn3-SQqhymuDZtcQDaxS0wbUXf2Ko0"
          alt="Post"
          className="w-[900px] lg:w-[800px] xl:w-[900px] max-h-[1000px] object-cover lg:ml-[30px] ml:[0px] rounded-8 mb-3 mt-3"
        />

        <div className="flex justify-between">
          <div className="flex text-xl">
            <a href="#">
              {" "}
              <SlLike className=" zoom-button w-7 h-7 text-yellow-300 xl:ml-10 ml:4" />
            </a>
            <a href="#" className=" zoom-button xl:ml-8 ml-0">
              <TfiComment className=" w-7 h-7 text-yellow-300 ml-5 " />
            </a>
            <a href="#" className=" zoom-button xl:ml-8 ml-0">
              <CiShare1 className=" w-7 h-7 text-yellow-300 ml-5  mb-1" />
            </a>
          </div>

          <span className="text-sm xl:mt-4 mt-2 text-gray-500">
            Posted on: January 15, 2023
          </span>
        </div>
      </div>
    </>
  );
};

export default Userpost;
