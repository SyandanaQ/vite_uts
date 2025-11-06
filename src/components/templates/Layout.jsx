import { Outlet } from "react-router-dom";
import Navbar from "../molecules/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white text-center py-3">
        <p>© 2025 TiketKu. All rights reserved.</p>
      </footer>
    </div>
  );
}
