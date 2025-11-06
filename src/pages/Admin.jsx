import { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Daftar Pemesanan Tiket
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">
          Belum ada pesanan yang masuk.
        </p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nama</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Event</th>
              <th className="border border-gray-300 px-4 py-2">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="text-center hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{order.nama}</td>
                <td className="border border-gray-300 px-4 py-2">{order.email}</td>
                <td className="border border-gray-300 px-4 py-2">{order.event}</td>
                <td className="border border-gray-300 px-4 py-2">{order.jumlah}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
