import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Ticket } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth(); // ambil data user & fungsi logout dari context

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-300 font-semibold"
      : "hover:text-yellow-200 transition";

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold">
          <Ticket size={28} />
          <span>TiketKu</span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-lg">
          <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/events" className={linkClass}>Events</NavLink></li>
          <li><NavLink to="/order" className={linkClass}>Order</NavLink></li>
          <li><NavLink to="/admin" className={linkClass}>Admin</NavLink></li>

          {user ? (
            <li className="flex items-center gap-3">
              <span className="font-semibold">Halo, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          ) : (
            <li><NavLink to="/login" className={linkClass}>Login</NavLink></li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-blue-700 p-4 flex flex-col gap-3 text-lg">
          <li><NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/events" className={linkClass} onClick={() => setOpen(false)}>Events</NavLink></li>
          <li><NavLink to="/order" className={linkClass} onClick={() => setOpen(false)}>Order</NavLink></li>
          <li><NavLink to="/admin" className={linkClass} onClick={() => setOpen(false)}>Admin</NavLink></li>

          {user ? (
            <li className="flex flex-col gap-2">
              <span className="font-semibold text-center">Halo, {user.name}</span>
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
