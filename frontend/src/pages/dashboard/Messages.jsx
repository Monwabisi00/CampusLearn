// src/pages/Messages.jsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import QueryModal from "./components/AddQuery";

export default function Messages() {
  const [queries, setQueries] = useState([
    { id: 1, title: "Async/Await Help", description: "Struggling with error handling." },
    { id: 2, title: "React Hooks", description: "Need explanation of useEffect." },
  ]);

  const [expandedQueryId, setExpandedQueryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addQuery = (newQuery) => {
    setQueries([...queries, { id: queries.length + 1, ...newQuery }]);
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
            <h1 className="text-2xl font-bold">Messages</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
            >
              Add New Query
            </button>
          </div>

          {/* Query List */}
          <div className="space-y-4">
            {queries.map((query) => {
              const isExpanded = expandedQueryId === query.id;

              return (
                <div
                  key={query.id}
                  className="p-4 bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition-all"
                  onClick={() => toggleExpand(query.id)}
                >
                  <h3 className="text-lg font-semibold">{query.title}</h3>
                  <p className="text-sm text-gray-600">{query.description}</p>

                  {isExpanded && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-semibold mb-2">Responses</h4>
                      <div className="space-y-2">
                        {/* Example responses for now */}
                        <p className="text-gray-700">No responses yet...</p>
                      </div>

                      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Add Response
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* Modal */}
      <QueryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addQuery}
      />
    </div>
  );
}
