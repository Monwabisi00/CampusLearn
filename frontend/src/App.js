// Main app component 
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/dashboard/Home';
import Login from './pages/auth/login';
import Signup from './pages/auth/Signup'
import TopicDetails from './pages/dashboard/Topics';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="Topics" element={<TopicDetails />} />
      </Routes>
    </div>
  );
}

export default App;