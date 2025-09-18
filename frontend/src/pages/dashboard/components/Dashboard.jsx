<<<<<<< HEAD
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
=======
import React, { useState } from "react";
import TopicCard from "./TopicCard";
import NotificationItem from "./NotificationItem";
import QueryModal from "./AddQuery";
>>>>>>> acf874866f1c215422c93bec44f1282e0df9f3b5

const Dashboard = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

<<<<<<< HEAD
  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <Outlet />
=======
export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queries, setQueries] = useState([]);

  const addQuery = (newQuery) => {
    setQueries([...queries, { id: queries.length + 1, ...newQuery }]);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Student Dashboard</h2>

      <div className="flex space-x-4 mb-6">
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          + Create New Topic
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="border px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Send Message
        </button>
      </div>

      {/* Topics */}
      <h3 className="text-lg font-semibold mb-2">Subscribed Topics</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {topics.map((t, idx) => (
          <TopicCard key={idx} title={t.title} activity={t.activity} />
        ))}
      </div>

      {/* Notifications */}
      <h3 className="text-lg font-semibold mb-2">Recent Notifications</h3>
      <div className="space-y-3">
        {notifications.map((n, idx) => (
          <NotificationItem key={idx} text={n.text} time={n.time} />
        ))}
      </div>

      {/* Modal */}
      <QueryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addQuery}
      />
>>>>>>> acf874866f1c215422c93bec44f1282e0df9f3b5
    </div>
  );
};

export default Dashboard;
