import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import useCurrentUser from "./customHooks/useCurrentUser.jsx";
import useGetOtherUsers from "./customHooks/useGetOtherUsers.jsx";
import Home from "./Pages/Home.jsx";
import Profile from "./Pages/Profile.jsx";

function App() {
  const { userData, loading } = useCurrentUser();
  useGetOtherUsers();
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
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
