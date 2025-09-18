// Main app component
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import TopicDetails from "./pages/dashboard/Topics";
import Messages from "./pages/dashboard/Messages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="Topics" element={<TopicDetails />} />
        <Route path="Messages" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
