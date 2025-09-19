import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, Mail, User, Bell } from "lucide-react";

const menuItems = [
  { icon: <Home size={18} />, label: "Dashboard", path: "/home" },
  { icon: <BookOpen size={18} />, label: "Topics", path: "/topics" },
  { icon: <Mail size={18} />, label: "Messages", path: "/messages" },
  { icon: <User size={18} />, label: "Profile", path: "/profile" },
  { icon: <Bell size={18} />, label: "Notifications", path: "/notifications" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
      <h1 className="text-lg font-bold mb-6">CampusLearn</h1>
      <nav className="space-y-2">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded-lg w-full text-left transition-colors ${
                isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
