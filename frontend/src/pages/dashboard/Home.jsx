import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
// import other pages later like Login, Profile, etc.

export default function Home() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="p-6 overflow-y-auto">
            <Dashboard />
          </main>
        </div>
      </div>
    </Router>
  );
}
