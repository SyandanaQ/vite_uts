import { Outlet } from "react-router-dom";
import Navbar from "../molecules/Navbar";

export default function Layout() {
  const footerStyle = {
    background: 'linear-gradient(135deg, rgb(31 41 55), rgb(17 24 39))',
    color: 'white',
    textAlign: 'center',
    padding: '2rem 1rem',
    marginTop: 'auto',
    borderTop: '1px solid rgb(75 85 99)'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <footer style={footerStyle}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <p style={{ 
            fontSize: '0.875rem', 
            marginBottom: '0.5rem',
            fontWeight: 500
          }}>
            © 2025 TiketKu. All rights reserved.
          </p>
          <p style={{ 
            fontSize: '0.75rem', 
            color: 'rgb(156 163 175)'
          }}>
            Platform pemesanan tiket event terpercaya
          </p>
        </div>
      </footer>
    </div>
  );
}