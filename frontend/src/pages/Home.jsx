import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container page-container-hero">
      <div className="page-content">
        
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-badge">
            <span className="hero-badge-icon">✨</span>
            <span>Platform Tiket Terpercaya</span>
          </div>

          <h1 className="hero-title">
            Selamat Datang di
            <span className="text-gradient"> TiketKu</span>
          </h1>

          <p className="hero-description">
            Pesan tiket event favoritmu dengan cepat, mudah, dan aman.
            Nikmati pengalaman terbaik bersama ribuan event menarik!
          </p>

          <div className="button-group">
            <button 
              onClick={() => navigate("/order")}
              className="btn btn-hero-primary"
            >
              🎟️ Pesan Sekarang
            </button>
            <button 
              onClick={() => navigate("/events")}
              className="btn btn-hero-secondary"
            >
              📋 Lihat Event
            </button>
          </div>

          {/* Stats */}
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-value">1000+</div>
              <div className="stat-label">Event Tersedia</div>
            </div>
            <div className="divider-vertical"></div>
            <div className="stat-item">
              <div className="stat-value">50K+</div>
              <div className="stat-label">Pengguna Aktif</div>
            </div>
            <div className="divider-vertical"></div>
            <div className="stat-item">
              <div className="stat-value">99%</div>
              <div className="stat-label">Kepuasan</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="card">
          <h2 className="card-title text-center">Kenapa Memilih TiketKu?</h2>
          
          <div className="grid-3">
            <div className="feature-card">
              <div className="feature-icon bg-blue">⚡</div>
              <h3 className="feature-title">Cepat & Mudah</h3>
              <p className="feature-desc">
                Proses pemesanan tiket hanya dalam hitungan menit
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon bg-green">🔒</div>
              <h3 className="feature-title">Aman Terpercaya</h3>
              <p className="feature-desc">
                Transaksi dijamin aman dengan sistem enkripsi terbaik
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon bg-purple">🎉</div>
              <h3 className="feature-title">Beragam Event</h3>
              <p className="feature-desc">
                Ribuan event menarik dari berbagai kategori
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}