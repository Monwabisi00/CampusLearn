import { useEffect, useState } from "react";
import { authUtils } from "../../utils/auth";
import QueryModal from "./components/AddQuery";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function Messages() {
  const [queries, setQueries] = useState([]);
  const [expandedQueryId, setExpandedQueryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all queries for the current user
  const fetchQueries = async () => {
    const user = JSON.parse(authUtils.getUser() || "{}");
    if (!user || !user.student_id) return;

    try {
      const res = await fetch(`http://localhost:5000/queries/${user.student_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUtils.getToken()}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch queries");
      const data = await res.json();
      setQueries(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const addQuery = async (newQuery) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/queries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUtils.getToken()}`,
        },
        body: JSON.stringify(newQuery),
      });
      if (!res.ok) throw new Error("Failed to create query");
      const createdQuery = await res.json();

      // Merge the new query into state — automatically updates UI
      setQueries((prev) => [createdQuery, ...prev]);

      // Show success alert first
      alert("Query created successfully!");

      // Then close modal
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating query:", err);
      alert("Failed to create query. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedQueryId(expandedQueryId === id ? null : id);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Queries</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
            >
              Add New Query
            </button>
          </div>

          {/* Query List */}
          <div className="space-y-4">
            {queries.length === 0 ? (
              <p>No queries available.</p>
            ) : (
              queries.map((query) => {
                const isExpanded = expandedQueryId === query.query_id;
                return (
                  <div
                    key={query.query_id}
                    className="p-4 bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition-all"
                    onClick={() => toggleExpand(query.query_id)}
                  >
                    <h3 className="text-lg font-semibold">{query.topic_title}</h3>
                    <p className="text-sm text-gray-600">{query.content}</p>
                    <p className="text-xs text-gray-400 mt-1">Topic: {query.topic_description}</p>

                    {isExpanded && (
                      <div className="mt-4 border-t pt-4">
                        <h4 className="font-semibold mb-2">Query Details</h4>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <strong>Created:</strong> {new Date(query.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Author:</strong> {query.student_name}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      <QueryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addQuery}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
