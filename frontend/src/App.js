// Main app component 
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/dashboard/Home';
import Login from './pages/auth/login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;