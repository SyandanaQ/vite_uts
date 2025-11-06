import { useState } from "react";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";

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

  const handleSubmit = (e) => {
  e.preventDefault();


  const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
  const newOrder = { ...form, id: Date.now() };
  localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

  alert(`Terima kasih ${form.nama}! Pesanan tiket ${form.event} (${form.jumlah} tiket) telah diterima.`);
  setForm({ nama: "", email: "", event: "", jumlah: 1 });
};


  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Form Pemesanan Tiket</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Nama Lengkap" name="nama" value={form.nama} onChange={handleChange} placeholder="Masukkan nama" />
        <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Masukkan email" />
        <Input label="Nama Event" name="event" value={form.event} onChange={handleChange} placeholder="Masukkan nama event" />
        <Input label="Jumlah Tiket" type="number" name="jumlah" value={form.jumlah} onChange={handleChange} />

        <Button text="Pesan Tiket" type="submit" color="blue" />
      </form>
    </div>
  );
}
