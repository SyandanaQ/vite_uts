import { Routes, Route } from "react-router-dom";
import Layout from "./components/templates/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Order from "./pages/Order";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/templates/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}
