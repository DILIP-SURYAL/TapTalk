import React from "react";
import SideBar from "../components/SideBar";
import MessageArea from "../components/MessageArea";
const Home = () => {
  return (
    <div className="flex h-screen w-screen">
      <SideBar />
      <MessageArea />
    </div>
  );
};

export default Home;
