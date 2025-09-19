import React, { useState } from "react";
import TopicCard from "./TopicCard";
import NotificationItem from "./NotificationItem";
import QueryModal from "./AddQuery";

const topics = [
  { title: "Data Structures & Algorithms", activity: "3 new queries" },
  { title: "Web Development", activity: "1 new response" },
  { title: "Machine Learning", activity: "2 new resources" },
];

const notifications = [
  {
    text: `New response to your query in "Data Structures"`,
    time: "2 hours ago",
  },
  { text: `New resource uploaded to "Web Development"`, time: "1 day ago" },
  { text: "Welcome to CampusLearn!", time: "3 days ago" },
];

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
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">+ Create New Topic</button>
        <button onClick={() => setIsModalOpen(true)} className="border px-4 py-2 rounded-lg hover:bg-gray-100">
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
      <QueryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addQuery} />
    </div>
  );
}
