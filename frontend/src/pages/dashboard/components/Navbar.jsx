import React from "react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-3 shadow">
      <input
        type="text"
        placeholder="Search topics, resources..."
        className="border rounded-lg px-4 py-2 w-1/3"
      />
      <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
        Logout
      </button>
    </header>
  );
}
