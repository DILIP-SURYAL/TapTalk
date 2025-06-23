import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
