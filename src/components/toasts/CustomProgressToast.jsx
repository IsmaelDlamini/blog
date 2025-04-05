// components/CustomProgressToast.jsx
import React from "react";

const CustomProgressToast = ({ progress }) => {
  return (
    <div className="w-full text-white">
      <p className="mb-2">Publishing post...</p>
      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default CustomProgressToast;
