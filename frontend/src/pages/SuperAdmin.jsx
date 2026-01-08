import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function SuperAdmin() {
  const [events, setEvents] = useState([]);
  const [chartData, setChartData] = useState(null);

  const [form, setForm] = useState({
    nama_event: "",
    tanggal: "",
    status: "ongoing",
  });
  const [editId, setEditId] = useState(null);

  // =====================
  // FETCH EVENTS
  // =====================
  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/events");
    setEvents(res.data);
  };

  // =====================
  // FETCH CHART DATA
  // =====================
  const fetchChart = async () => {
    const res = await axios.get(
      "http://localhost:5000/reports/tickets-per-event"
    );

    const labels = res.data.map((item) => item.nama_event);
    const data = res.data.map((item) => Number(item.total_tiket));

    setChartData({
      labels,
      datasets: [
        {
          label: "Jumlah Tiket Terjual",
          data,
          backgroundColor: "rgba(147, 51, 234, 0.7)",
          borderRadius: 8,
          borderWidth: 0,
        },
      ],
    });
  };

  useEffect(() => {
    fetchEvents();
    fetchChart();
  }, []);

  // =====================
  // FORM
  // =====================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/events/${editId}`,
          form
        );
      } else {
        await axios.post("http://localhost:5000/events", form);
      }

      setForm({ nama_event: "", tanggal: "", status: "ongoing" });
      setEditId(null);
      fetchEvents();
      fetchChart();
    } catch {
      alert("Gagal menyimpan event");
    }
  };

  const handleEdit = (event) => {
    setEditId(event.id);
    setForm({
      nama_event: event.nama_event,
      tanggal: event.tanggal.slice(0, 16),
      status: event.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus event ini?")) return;
    await axios.delete(`http://localhost:5000/events/${id}`);
    fetchEvents();
    fetchChart();
  };

  return (
    <div className="page-container">
      <div className="page-content">
        
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Super Admin</h1>
          <p className="page-subtitle">Manajemen Event & Analytics</p>
        </div>

        {/* Chart Section */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Grafik Penjualan Tiket</h2>
            <span className="badge badge-purple">Per Event</span>
          </div>

          {!chartData ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Memuat data chart...</p>
            </div>
          ) : (
            <div className="chart-container">
              <Bar 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="card">
          <h2 className="card-title">
            {editId ? "Edit Event" : "Tambah Event Baru"}
          </h2>

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group form-group-full">
              <label className="form-label">Nama Event</label>
              <input
                className="form-input"
                placeholder="Masukkan nama event..."
                name="nama_event"
                value={form.nama_event}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tanggal & Waktu</label>
              <input
                type="datetime-local"
                className="form-input"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status Event</label>
              <select
                className="form-input"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="ongoing">Ongoing</option>
                <option value="finish">Finish</option>
              </select>
            </div>

            <div className="form-group form-group-full">
              <button type="submit" className="btn btn-primary">
                {editId ? "💾 Update Event" : "➕ Tambah Event"}
              </button>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="card card-table">
          <div className="table-header">
            <div>
              <h2 className="card-title">Daftar Event</h2>
              <p className="table-subtitle">Total {events.length} event</p>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nama Event</th>
                  <th>Tanggal</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="table-empty">
                      <span className="text-4xl">📅</span>
                      <p>Belum ada event</p>
                    </td>
                  </tr>
                ) : (
                  events.map((e) => (
                    <tr key={e.id}>
                      <td className="font-medium">{e.nama_event}</td>
                      <td className="text-sm text-gray-600">
                        {new Date(e.tanggal).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short"
                        })}
                      </td>
                      <td className="text-center">
                        <span className={`status-badge ${
                          e.status === "ongoing" ? "status-ongoing" : "status-finish"
                        }`}>
                          {e.status === "ongoing" ? "🟢" : "⚫"} {e.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            onClick={() => handleEdit(e)}
                            className="btn btn-warning btn-sm"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(e.id)}
                            className="btn btn-danger btn-sm"
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

