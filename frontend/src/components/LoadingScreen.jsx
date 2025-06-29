// components/LoadingScreen.jsx
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-blue-600 text-white flex-col space-y-6">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <h1 className="text-2xl font-semibold tracking-wider">
        Loading, please wait...
      </h1>
    </div>
  );
};

export default LoadingScreen;
