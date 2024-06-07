import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video flex flex-col justify-center px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold w-1/2">{title}</h1>
      <p className="py-6 font-medium text-lg w-2/5">{overview}</p>
      <div>
        <button className="bg-white bg-opacity-100 text-black p-4 px-14 text-lg mr-5 font-medium rounded-lg hover:bg-opacity-80">
          Play
        </button>
        <button className="bg-gray-500 text-white p-4 px-10 text-lg mr-5 font-medium bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
