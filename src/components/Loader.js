import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen relative z-99 bg-black bg-opacity-50">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-red-600 h-16 w-16"></div>
    </div>
  );
};

export default Loader;
