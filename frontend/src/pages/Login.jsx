import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError("Username atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container page-container-gradient">
      <div className="page-content" style={{ maxWidth: '28rem' }}>
        
        {/* Login Card */}
        <div className="card">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem',
              animation: 'pulse-icon 2s infinite'
            }}>
              🎫
            </div>
            <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>
              Login TiketKu
            </h1>
            <p className="page-subtitle">
              Masuk untuk mengelola event dan pemesanan
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: 'rgb(254 226 226)',
              border: '1px solid rgb(252 165 165)',
              color: 'rgb(185 28 28)',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group form-group-full">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Masukkan username..."
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group form-group-full">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password..."
                required
                autoComplete="current-password"
              />
            </div>

            <div className="form-group form-group-full">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span className="spinner" style={{ width: '1.25rem', height: '1.25rem', borderWidth: '2px' }}></span>
                    <span>Memproses...</span>
                  </span>
                ) : (
                  "🔐 Login"
                )}
              </button>
            </div>
          </form>

          {/* Info */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgb(243 244 246)',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.875rem', color: 'rgb(107 114 128)' }}>
              💡 Gunakan kredensial yang telah diberikan
            </p>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="card" style={{ 
          background: 'rgb(239 246 255)', 
          borderColor: 'rgb(191 219 254)' 
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>ℹ️</span>
            <div>
              <h3 style={{ 
                fontWeight: 600, 
                marginBottom: '0.5rem', 
                color: 'rgb(31 41 55)',
                fontSize: '0.875rem'
              }}>
                Demo Accounts
              </h3>
              <div style={{ 
                fontSize: '0.75rem', 
                color: 'rgb(75 85 99)', 
                lineHeight: 1.6 
              }}>
                <p><strong>Super Admin:</strong> superadmin / super123</p>
                <p><strong>Admin:</strong> admin / admin123</p>
                <p><strong>User:</strong> user / user123</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}