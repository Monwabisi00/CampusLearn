// src/components/QueryModal.jsx
import React from "react";

export default function QueryModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newQuery = {
      title: formData.get("title"),
      description: formData.get("description"),
    };
    onSubmit(newQuery);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Query</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              required
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-300"
              placeholder="Enter query title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows="3"
              required
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-indigo-300"
              placeholder="Enter query details"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
              Submit Query
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
