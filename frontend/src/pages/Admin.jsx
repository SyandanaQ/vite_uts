import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOrder, setEditOrder] = useState(null);

  // ambil data orders
  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // DELETE order
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus pesanan ini?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/orders/${id}`);
      setOrders(orders.filter((order) => order.id !== id));
    } catch (error) {
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
    } catch (error) {
      alert("Gagal mengupdate data");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Daftar Pemesanan Tiket
      </h2>

      {/* FORM EDIT */}
      {editOrder && (
        <div className="mb-6 bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-3">Edit Order</h3>

          <input
            className="border p-2 w-full mb-2"
            value={editOrder.nama}
            onChange={(e) =>
              setEditOrder({ ...editOrder, nama: e.target.value })
            }
          />

          <input
            className="border p-2 w-full mb-2"
            value={editOrder.email}
            onChange={(e) =>
              setEditOrder({ ...editOrder, email: e.target.value })
            }
          />

          <input
            className="border p-2 w-full mb-2"
            value={editOrder.event}
            onChange={(e) =>
              setEditOrder({ ...editOrder, event: e.target.value })
            }
          />

          <input
            type="number"
            className="border p-2 w-full mb-3"
            value={editOrder.jumlah}
            onChange={(e) =>
              setEditOrder({ ...editOrder, jumlah: e.target.value })
            }
          />

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Simpan
            </button>

            <button
              onClick={() => setEditOrder(null)}
              className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-600">Memuat data...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">
          Belum ada pesanan yang masuk.
        </p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Event</th>
              <th className="border px-4 py-2">Jumlah</th>
              <th className="border px-4 py-2">Waktu</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center hover:bg-gray-50">
                <td className="border px-4 py-2">{order.nama}</td>
                <td className="border px-4 py-2">{order.email}</td>
                <td className="border px-4 py-2">{order.event}</td>
                <td className="border px-4 py-2">{order.jumlah}</td>
                <td className="border px-4 py-2">
                  {new Date(order.created_at).toLocaleString()}
                </td>
                <td className="border px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => setEditOrder(order)}
                    className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
