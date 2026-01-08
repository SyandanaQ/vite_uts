import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePesanTiket = () => {
    navigate("/order");
  };

  return (
    <div className="page-container page-container-gradient">
      <div className="page-content">
        
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Daftar Event</h1>
          <p className="page-subtitle">
            Temukan event menarik yang sesuai dengan minat Anda
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Memuat data event...</p>
          </div>
        ) : events.length === 0 ? (
          /* Empty State */
          <div className="card">
            <div className="empty-state">
              <span className="empty-state-icon">📅</span>
              <h3 className="empty-state-title">Belum Ada Event</h3>
              <p className="empty-state-desc">
                Saat ini belum ada event yang tersedia. Silakan cek kembali nanti!
              </p>
            </div>
          </div>
        ) : (
          /* Event Grid */
          <div className="grid-2">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                {/* Event Header */}
                <div className="event-card-header">
                  <h3 className="event-card-title">{event.nama_event}</h3>
                  <span className={`badge status-badge ${
                    event.status === "ongoing" ? "status-ongoing" : "status-finish"
                  }`}>
                    {event.status === "ongoing" ? "🟢" : "⚫"} {event.status}
                  </span>
                </div>

                {/* Event Info */}
                <div className="event-card-body">
                  <div className="event-info-item">
                    <span className="event-info-icon">📅</span>
                    <div className="event-info-content">
                      <p className="event-info-label">Tanggal</p>
                      <p className="event-info-value">
                        {new Date(event.tanggal).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="event-info-item">
                    <span className="event-info-icon">🕐</span>
                    <div className="event-info-content">
                      <p className="event-info-label">Waktu</p>
                      <p className="event-info-value">
                        {new Date(event.tanggal).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Event Footer */}
                <div className="event-card-footer">
                  {event.status === "ongoing" ? (
                    <button 
                      onClick={handlePesanTiket}
                      className="btn btn-event-book"
                    >
                      🎫 Pesan Tiket
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="btn"
                      style={{ 
                        width: '100%',
                        background: 'rgb(229 231 235)',
                        color: 'rgb(156 163 175)',
                        cursor: 'not-allowed',
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      Event Telah Berakhir
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}