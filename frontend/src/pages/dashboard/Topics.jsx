import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const topicsData = [
  {
    id: 1,
    title: "Advanced JavaScript Concepts",
    description:
      "Deep dive into advanced JavaScript topics including closures, prototypes, async/await, and modern ES6+ features.",
    author: "Dr. Sarah Johnson",
    resources: [
      { name: "JavaScript Closures Guide", type: "PDF - 2.4 MB" },
      { name: "Async/Await Tutorial", type: "Video - 45 minutes" },
      { name: "Code Examples", type: "ZIP - 850 KB" },
    ],
    queries: [
      {
        user: "Ryan Thurlbon",
        time: "2 days ago",
        text: `Can someone explain the difference between regular functions and arrow functions when it comes to the "this" keyword?`,
        response: {
          user: "Monwabisi Mbongeni Mashiane",
          time: "1 day ago",
          text: `Arrow functions don’t have their own 'this' context – they inherit it from the enclosing scope.`,
        },
      },
    ],
  },
  {
    id: 2,
    title: "Web Development Basics",
    description: "Learn the fundamentals of web development, including HTML, CSS, JavaScript, and responsive design.",
    author: "Prof. David Smith",
    resources: [
      { name: "HTML & CSS Guide", type: "PDF - 3 MB" },
      { name: "Responsive Design Tutorial", type: "Video - 30 minutes" },
    ],
    queries: [
      {
        user: "Jamie Palmer",
        time: "5 days ago",
        text: `How do I handle cross-browser compatibility issues in CSS?`,
        response: {
          user: "Charl Kruger",
          time: "4 days ago",
          text: `Use vendor prefixes, feature detection, and tools like Autoprefixer to ensure compatibility.`,
        },
      },
    ],
  },
];

const Topics = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex flex-col flex-1">
        <Navbar />

        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">Topics</h2>

          {topicsData.map((topic) => (
            <div
              key={topic.id}
              className="bg-white p-6 rounded-2xl shadow mb-6 cursor-pointer"
              onClick={() => toggleExpand(topic.id)}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600 mt-1">{topic.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Created by <span className="font-medium">{topic.author}</span>
                  </p>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-lg">
                  {expanded === topic.id ? "Collapse" : "Expand"}
                </button>
              </div>

              {/* Expanded Content */}
              {expanded === topic.id && (
                <div className="mt-6 space-y-6">
                  {/* Resources */}
                  <div>
                    <h4 className="font-semibold mb-2">Resources</h4>
                    <ul className="space-y-3">
                      {topic.resources.map((res, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <div>
                            <p className="font-medium">{res.name}</p>
                            <p className="text-sm text-gray-500">{res.type}</p>
                          </div>
                          <button className="bg-gray-200 px-3 py-1 rounded-lg">⬇</button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Queries */}
                  <div>
                    <h4 className="font-semibold mb-2">Queries & Responses</h4>
                    {topic.queries.map((q, idx) => (
                      <div key={idx} className="mb-6">
                        <p className="font-semibold">
                          {q.user} <span className="text-gray-500 text-sm">· {q.time}</span>
                        </p>
                        <p className="text-gray-700 mt-1">{q.text}</p>
                        {q.response && (
                          <div className="ml-4 mt-3 border-l-2 pl-4 border-gray-300">
                            <p className="font-semibold">
                              {q.response.user} <span className="text-gray-500 text-sm">· {q.response.time}</span>
                            </p>
                            <p className="text-gray-700 mt-1">{q.response.text}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Topics;
