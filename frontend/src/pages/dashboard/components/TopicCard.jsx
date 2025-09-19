import React from "react";

export default function TopicCard({ title, activity }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-500 mb-3">Recent activity: {activity}</p>
      <button className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800">View Topic</button>
    </div>
  );
}
