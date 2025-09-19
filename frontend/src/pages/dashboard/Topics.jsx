import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // Note: it's "plugin", not "plugins"
import { useEffect, useState } from "react";
import { authUtils } from "../../utils/auth";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Extend dayjs with the plugin
dayjs.extend(relativeTime);

const Topics = () => {
  const [expanded, setExpanded] = useState(null);
  const [topics, setTopics] = useState([]);
  const [queriesByTopic, setQueriesByTopic] = useState({});

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

  const toggleExpand = async (topicId) => {
    if (expanded === topicId) {
      setExpanded(null); // collapse
      return;
    }

    setExpanded(topicId); // expand clicked topic

    // fetch queries if not loaded
    if (!queriesByTopic[topicId]) {
      try {
        const res = await fetch(`http://localhost:5000/queries/topic/${topicId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authUtils.getToken()}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch queries");
        const data = await res.json();
        setQueriesByTopic((prev) => ({ ...prev, [topicId]: data }));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">Topics</h2>

          {topics.length === 0 ? (
            <p>No topics available.</p>
          ) : (
            topics.map((topic) => {
              const isExpanded = expanded === topic.topic_id; // only true for clicked topic
              return (
                <div key={topic.topic_id} className="bg-white p-6 rounded-2xl shadow mb-6">
                  <div className="flex items-center justify-between cursor-pointer">
                    <div onClick={() => toggleExpand(topic.topic_id)}>
                      <h3 className="text-lg font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-gray-600 mt-1">{topic.description}</p>
                      <p className="text-sm text-gray-500 mt-2">{dayjs(topic.created_at).fromNow()}</p>
                    </div>
                    <button
                      onClick={() => toggleExpand(topic.topic_id)}
                      className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                      {isExpanded ? "Collapse" : "Expand"}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-6 space-y-2">
                      <h4 className="font-semibold mb-2">Queries</h4>
                      {queriesByTopic[topic.topic_id]?.length === 0 ? (
                        <p className="text-sm text-gray-500">No queries yet.</p>
                      ) : (
                        queriesByTopic[topic.topic_id]?.map((q, idx) => (
                          <div key={idx} className="mb-2">
                            <p className="font-semibold">
                              {q.user} <span className="text-gray-500 text-sm">{dayjs(q.created_at).fromNow()}</span>
                            </p>
                            <p className="text-gray-700 mt-1">{q.content}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
};

export default Topics;
