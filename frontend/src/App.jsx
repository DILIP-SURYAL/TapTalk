import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import useCurrentUser from "./customHooks/useCurrentUser.jsx";
import useGetOtherUsers from "./customHooks/useGetOtherUsers.jsx";
import Home from "./Pages/Home.jsx";
import Profile from "./Pages/Profile.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { API_END_POINT } from "./constant.js";
import { setOnlineUsers, setSocket } from "./redux/userSlice.js";
import { SocketContext } from "./socket/socket.js";
import { setMessages } from "./redux/messageSlice.js";
import LoadingScreen from "./components/LoadingScreen.jsx";
function App() {
  const { userData } = useCurrentUser();
  const { loading } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const socket = useContext(SocketContext);

  useGetOtherUsers();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData) {
      socket.io.opts.query = { userId: userData._id };
      socket.connect();

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Setup newMessage listener
      socket.on("newMessage", (newMsg) => {
        dispatch(setMessages([...messages, newMsg]));
      });

      return () => {
        socket.off("getOnlineUsers");
        socket.off("newMessage");
        socket.disconnect(); // Optional: Only if you want to fully disconnect
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [userData, dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={userData ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={userData ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/"
        element={!userData ? <Navigate to="/login" /> : <Home />}
      />
      <Route
        path="/profile"
        element={!userData ? <Navigate to="/login" /> : <Profile />}
      />
    </Routes>
  );
}

export default App;
