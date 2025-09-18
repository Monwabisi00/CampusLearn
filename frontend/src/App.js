// Main app component
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import TopicDetails from "./pages/dashboard/Topics";
<<<<<<< HEAD
import Dashboard from "./pages/dashboard/components/Dashboard";
=======
import Messages from "./pages/dashboard/Messages";
>>>>>>> acf874866f1c215422c93bec44f1282e0df9f3b5

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
<<<<<<< HEAD
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="topics" element={<TopicDetails />} />
        </Route>
=======
        <Route path="Topics" element={<TopicDetails />} />
        <Route path="Messages" element={<Messages />} />
>>>>>>> acf874866f1c215422c93bec44f1282e0df9f3b5
      </Routes>
    </div>
  );
}

export default App;
