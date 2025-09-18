import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 overflow-y-auto">
          {/* Content for the home page */}
          <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
        </main>
      </div>
    </div>
  );
}
