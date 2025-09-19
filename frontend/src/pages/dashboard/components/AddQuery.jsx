import React, { useState, useEffect } from "react";
import { authUtils } from "../../../utils/auth";

export default function QueryModal({ isOpen, onClose, onSuccess }) {
  const [modules, setModules] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch modules when modal opens
  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:5000/modules")
        .then((res) => res.json())
        .then((data) => setModules(data))
        .catch((err) => console.error("Failed to fetch modules:", err));
    }
  }, [isOpen]);

  // Fetch topics for the chosen module
  useEffect(() => {
    if (selectedModule) {
      fetch(`http://localhost:5000/topics/module/${selectedModule}`)
        .then((res) => res.json())
        .then((data) => setTopics(data))
        .catch((err) => console.error("Failed to fetch topics:", err));
    }
  }, [selectedModule]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTopic || !content.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/queries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUtils.getToken()}`, // assuming JWT
        },
        body: JSON.stringify({
          topic_id: selectedTopic,
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create query");
      } else {
        if (onSuccess) onSuccess(data); // let parent refresh list
        setSelectedModule("");
        setSelectedTopic("");
        setContent("");
        onClose();
      }
    } catch (err) {
      console.error("Error creating query:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Query</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Module */}
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select a Module</option>
            {modules.map((m) => (
              <option key={m.module_id} value={m.module_id}>
                {m.name}
              </option>
            ))}
          </select>

          {/* Select Topic (depends on module) */}
          {selectedModule && (
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select a Topic</option>
              {topics.map((t) => (
                <option key={t.topic_id} value={t.topic_id}>
                  {t.title}
                </option>
              ))}
            </select>
          )}

          {/* Query content */}
          <textarea
            placeholder="Enter your query..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
