import SideBar from "../components/SideBar";
import MessageArea from "../components/MessageArea";
import useGetMessages from "../customHooks/useGetMessages";
const Home = () => {
  useGetMessages();
  return (
    <div className="flex h-screen w-screen">
      <SideBar />
      <MessageArea />
    </div>
  );
};

export default Home;
