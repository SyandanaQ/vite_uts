import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [events, setEvents] = useState([]); // EVENT ONGOING
  const [loading, setLoading] = useState(true);
  const [editOrder, setEditOrder] = useState(null);

  // ambil data orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders");
      setOrders(res.data);
    } finally {
      setLoading(false);
    }
  };

  // ambil event ongoing
  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/events");
    const ongoing = res.data.filter((e) => e.status === "ongoing");
    setEvents(ongoing);
  };

  useEffect(() => {
    fetchOrders();
    fetchEvents();
  }, []);

  // DELETE order
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pesanan ini?")) return;

    try {
      await axios.delete(`http://localhost:5000/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch {
      alert("Gagal menghapus data");
    }
  };

  // UPDATE order
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/orders/${editOrder.id}`,
        editOrder
      );

      setOrders((prev) =>
        prev.map((o) =>
          o.id === editOrder.id ? editOrder : o
        )
      );

      setEditOrder(null);
    } catch {
      alert("Gagal mengupdate data");
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Admin Panel</h1>
          <p className="page-subtitle">Kelola pemesanan tiket dari pengguna</p>
        </div>

        {/* FORM EDIT */}
        {editOrder && (
          <div className="card">
            <h2 className="card-title">Edit Pesanan</h2>

            <form className="form-grid">
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input
                  className="form-input"
                  value={editOrder.nama}
                  onChange={(e) =>
                    setEditOrder({ ...editOrder, nama: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  value={editOrder.email}
                  onChange={(e) =>
                    setEditOrder({ ...editOrder, email: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Event</label>
                <select
                  className="form-input"
                  value={editOrder.event}
                  onChange={(e) =>
                    setEditOrder({ ...editOrder, event: e.target.value })
                  }
                >
                  <option value="">Pilih Event</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.nama_event}>
                      {event.nama_event} ({new Date(event.tanggal).toLocaleDateString("id-ID")})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Jumlah Tiket</label>
                <input
                  type="number"
                  className="form-input"
                  value={editOrder.jumlah}
                  onChange={(e) =>
                    setEditOrder({ ...editOrder, jumlah: e.target.value })
                  }
                />
              </div>

              <div className="form-group form-group-full">
                <div className="button-group">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="btn btn-primary"
                  >
                    💾 Simpan Perubahan
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditOrder(null)}
                    className="btn"
                    style={{ 
                      background: 'rgb(229 231 235)', 
                      color: 'rgb(75 85 99)',
                      padding: '0.75rem 1.5rem'
                    }}
                  >
                    ✖️ Batal
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TABLE SECTION */}
        <div className="card card-table">
          <div className="table-header">
            <div>
              <h2 className="card-title">Daftar Pemesanan</h2>
              <p className="table-subtitle">Total {orders.length} pesanan</p>
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p className="loading-text">Memuat data pesanan...</p>
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'rgb(107 114 128)' }}>
              <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>📭</span>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Belum Ada Pesanan
              </p>
              <p style={{ fontSize: '0.875rem' }}>
                Pesanan yang masuk akan muncul di sini
              </p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Event</th>
                    <th className="text-center">Jumlah</th>
                    <th>Waktu Pesan</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="font-medium">{order.nama}</td>
                      <td className="text-sm text-gray-600">{order.email}</td>
                      <td>{order.event}</td>
                      <td className="text-center">
                        <span className="badge badge-purple">
                          {order.jumlah} tiket
                        </span>
                      </td>
                      <td className="text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short"
                        })}
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            onClick={() => setEditOrder(order)}
                            className="btn btn-warning btn-sm"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="btn btn-danger btn-sm"
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}