import { useEffect, useState } from "react";
import { authUtils } from "../../../utils/auth";

export default function TopicModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");

  // Fetch modules when modal opens
  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:5000/modules")
        .then((res) => res.json())
        .then((data) => setModules(data))
        .catch((err) => console.error("Failed to fetch modules:", err));
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Please fill in both fields");

    try {
      const res = await fetch("http://localhost:5000/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUtils.getToken()}`,
        },
        body: JSON.stringify({
          title,
          description,
          module_id: selectedModule,
        }),
      });

      if (!res.ok) throw new Error("Failed to create topic");

      const data = await res.json();
      onSubmit(data); // <-- This calls addQuery in Dashboard
      setTitle("");
      setDescription("");
      onClose();
      alert("Topic created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating topic");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Topic</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Dropdown for modules */}
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select a module</option>
            {modules.map((m) => (
              <option key={m.module_id} value={m.module_id}>
                {m.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
