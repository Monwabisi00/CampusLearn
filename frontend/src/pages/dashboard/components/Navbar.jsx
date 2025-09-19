import { useNavigate } from "react-router-dom";
import { authUtils } from "../../../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between bg-white px-6 py-3 shadow">
      <input type="text" placeholder="Search topics, resources..." className="border rounded-lg px-4 py-2 w-1/3" />
      <button
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        onClick={() => {
          authUtils.removeToken();
          authUtils.removeUser();
          navigate("/");
        }}
      >
        Logout
      </button>
    </header>
  );
}
