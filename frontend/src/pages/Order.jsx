import { useEffect, useState } from "react";
import axios from "axios";

export default function Order() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    event_id: "",
    jumlah: 1,
  });

  // ambil event ongoing saja
  useEffect(() => {
    axios.get("http://localhost:5000/events").then((res) => {
      const ongoingEvents = res.data.filter(
        (e) => e.status === "ongoing"
      );
      setEvents(ongoingEvents);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/orders", {
        nama: form.nama,
        email: form.email,
        event: events.find(ev => ev.id == form.event_id)?.nama_event,
        jumlah: form.jumlah,
      });

      alert("Pesanan berhasil dibuat");
      setForm({ nama: "", email: "", event_id: "", jumlah: 1 });
    } catch {
      alert("Gagal membuat pesanan");
    }
  };

  return (
    <div className="page-container">
      <div className="page-content" style={{ maxWidth: '42rem' }}>
        
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Form Pemesanan Tiket</h1>
          <p className="page-subtitle">
            Isi formulir di bawah untuk memesan tiket event favorit Anda
          </p>
        </div>

        {/* Form Card */}
        <div className="card">
          <form onSubmit={handleSubmit} className="form-grid">
            
            {/* Nama Lengkap */}
            <div className="form-group form-group-full">
              <label className="form-label">Nama Lengkap</label>
              <input
                className="form-input"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap Anda..."
                required
              />
            </div>

            {/* Email */}
            <div className="form-group form-group-full">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contoh@email.com"
                required
              />
            </div>

            {/* Pilih Event */}
            <div className="form-group form-group-full">
              <label className="form-label">Pilih Event</label>
              <select
                name="event_id"
                value={form.event_id}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">-- Pilih Event --</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.nama_event} ({new Date(event.tanggal).toLocaleDateString("id-ID")})
                  </option>
                ))}
              </select>
            </div>

            {/* Jumlah Tiket */}
            <div className="form-group form-group-full">
              <label className="form-label">Jumlah Tiket</label>
              <input
                type="number"
                className="form-input"
                name="jumlah"
                value={form.jumlah}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-group form-group-full">
              <button type="submit" className="btn btn-primary">
                🎫 Pesan Tiket Sekarang
              </button>
            </div>

          </form>
        </div>

        {/* Info Card */}
        <div className="card" style={{ background: 'rgb(250 245 255)', borderColor: 'rgb(233 213 255)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '2rem' }}>ℹ️</span>
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'rgb(31 41 55)' }}>
                Informasi Pemesanan
              </h3>
              <ul style={{ color: 'rgb(75 85 99)', fontSize: '0.875rem', lineHeight: 1.6, paddingLeft: '1.25rem' }}>
                <li>Pastikan email yang Anda masukkan aktif</li>
                <li>Konfirmasi pemesanan akan dikirim via email</li>
                <li>Tiket dapat diunduh setelah pembayaran dikonfirmasi</li>
                <li>Hubungi customer service jika ada kendala</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}