import React from "react";
import { Home, BookOpen, Mail, User, Bell } from "lucide-react";

const menuItems = [
  { icon: <Home size={18} />, label: "Dashboard" },
  { icon: <BookOpen size={18} />, label: "Topics" },
  { icon: <Mail size={18} />, label: "Messages" },
  { icon: <User size={18} />, label: "Profile" },
  { icon: <Bell size={18} />, label: "Notifications" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
      <h1 className="text-lg font-bold mb-6">CampusLearn</h1>
      <nav className="space-y-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 w-full text-left"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
