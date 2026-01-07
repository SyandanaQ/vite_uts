import { useState } from "react";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import axios from "axios";

export default function Order() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    event: "",
    jumlah: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/orders", form);
      alert("Pesanan berhasil disimpan ke database!");
      setForm({ nama: "", email: "", event: "", jumlah: 1 });
    } catch (err) {
      alert("Gagal menyimpan pesanan");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Form Pemesanan Tiket
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Nama Lengkap" name="nama" value={form.nama} onChange={handleChange} />
        <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Nama Event" name="event" value={form.event} onChange={handleChange} />
        <Input label="Jumlah Tiket" type="number" name="jumlah" value={form.jumlah} onChange={handleChange} />

        <Button text="Pesan Tiket" type="submit" color="blue" />
      </form>
    </div>
  );
}
