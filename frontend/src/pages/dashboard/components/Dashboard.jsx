import { useEffect, useState } from "react";
import { authUtils } from "../../../utils/auth";
import QueryModal from "./AddQuery";
import TopicModal from "./CreateTopic"; // new modal
import TopicCard from "./TopicCard";

export default function Dashboard() {
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [queries, setQueries] = useState([]);
  const [topics, setTopics] = useState([]);

  const addQuery = (newQuery) => {
    setQueries([...queries, { id: queries.length + 1, ...newQuery }]);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("http://localhost:5000/topics", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authUtils.getToken()}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch topics");
        const data = await res.json();
        setTopics(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Student Dashboard</h2>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setIsTopicModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          + Create New Topic
        </button>
        <button
          onClick={() => setIsQueryModalOpen(true)}
          className="border px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Send Query
        </button>
      </div>

      {/* Topics */}
      <h3 className="text-lg font-semibold mb-2">Topics</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {topics.length === 0 ? (
          <p>No topics yet.</p>
        ) : (
          topics.map((t, idx) => <TopicCard key={idx} title={t.title} module_id={t.module_id} />)
        )}
      </div>

      {/* Notifications */}
      <h3 className="text-lg font-semibold mb-2">Recent Messages</h3>
      <div className="space-y-3"></div>

      {/* Modals */}
      <QueryModal isOpen={isQueryModalOpen} onClose={() => setIsQueryModalOpen(false)} onSubmit={addQuery} />

      <TopicModal
        isOpen={isTopicModalOpen}
        onClose={() => setIsTopicModalOpen(false)}
        onSubmit={(newTopic) => setTopics([...topics, newTopic])}
      />
    </div>
  );
}
