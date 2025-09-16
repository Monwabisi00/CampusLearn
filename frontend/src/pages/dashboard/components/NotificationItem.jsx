import React from "react";

export default function NotificationItem({ text, time }) {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow border">
      <div>
        <p className="font-medium">{text}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <button className="border px-3 py-1 rounded hover:bg-gray-100">
        Mark as Read
      </button>
    </div>
  );
}
