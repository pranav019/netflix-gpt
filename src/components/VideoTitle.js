import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video flex flex-col justify-center pt-[20%] px-6 md:px-12 md:pt-[60px] lg:pt-[0] absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold w-1/2">{title}</h1>
      <p className="hidden lg:block py-6 font-medium w-2/5">{overview}</p>
      <div className="mb-5 ">
        <button className="bg-white bg-opacity-100 text-black py-2 px-6 md:p-4 md:px-14 text-lg mt-4 md:mt-4 lg:mt-0 mr-5 font-medium rounded-lg hover:bg-opacity-80">
          Play
        </button>
        <button className=" bg-gray-500 text-white py-2 px-4  md:p-4 md:px-10 text-lg mr-5 font-medium bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
