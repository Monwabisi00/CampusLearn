// Main app component
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/dashboard/Home";
import Queries from "./pages/dashboard/Queries";
import TopicDetails from "./pages/dashboard/Topics";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="topics"
          element={
            <ProtectedRoute>
              <TopicDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="queries"
          element={
            <ProtectedRoute>
              <Queries />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
