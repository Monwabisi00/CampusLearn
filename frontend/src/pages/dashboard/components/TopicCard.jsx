import { useNavigate } from "react-router-dom";

const moduleMap = {
  1: "Data Structures & Algorithms",
  2: "Web Development",
  3: "Machine Learning",
  4: "Databases",
};

export default function TopicCard({ title, module_id }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-500 mb-3">Module: {moduleMap[module_id]}</p>
      <button className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800" onClick={() => navigate("/topics")}>
        View Topic
      </button>
    </div>
  );
}
