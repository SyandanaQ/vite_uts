import express from "express";
import cors from "cors";
import db from "./config/database.js";

const app = express();
app.use(cors());
app.use(express.json());

// API LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    res.json({
      id: result[0].id,
      username: result[0].username,
    });
  });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

// API Orders
app.post("/orders", (req, res) => {
  const { nama, email, event, jumlah } = req.body;

  const sql = `
    INSERT INTO orders (nama, email, event, jumlah)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nama, email, event, jumlah], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal menyimpan order" });
    }

    res.status(201).json({
      message: "Order berhasil disimpan",
      orderId: result.insertId,
    });
  });
});

app.get("/orders", (req, res) => {
  const sql = "SELECT * FROM orders ORDER BY created_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Gagal mengambil data order" });
    }

    res.json(result);
  });
});

app.delete("/orders/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM orders WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Gagal menghapus order",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Order tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Order berhasil dihapus",
    });
  });
});

app.put("/orders/:id", (req, res) => {
  const { id } = req.params;
  const { nama, email, event, jumlah } = req.body;

  const sql = `
    UPDATE orders 
    SET nama = ?, email = ?, event = ?, jumlah = ?
    WHERE id = ?
  `;

  db.query(sql, [nama, email, event, jumlah, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update order" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }

    res.json({ message: "Order berhasil diupdate" });
  });
});

// API Events

app.get("/events", (req, res) => {
  const sql = "SELECT * FROM events ORDER BY tanggal ASC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Gagal mengambil data event" });
    }
    res.json(result);
  });
});

app.get("/events/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM events WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (result.length === 0)
        return res.status(404).json({ message: "Event tidak ditemukan" });

      res.json(result[0]);
    }
  );
});

app.post("/events", (req, res) => {
  const { nama_event, tanggal, status } = req.body;

  const sql = `
    INSERT INTO events (nama_event, tanggal, status)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nama_event, tanggal, status], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Gagal menambah event" });
    }

    res.status(201).json({
      message: "Event berhasil ditambahkan",
      id: result.insertId,
    });
  });
});

app.put("/events/:id", (req, res) => {
  const { id } = req.params;
  const { nama_event, tanggal, status } = req.body;

  const sql = `
    UPDATE events
    SET nama_event = ?, tanggal = ?, status = ?
    WHERE id = ?
  `;

  db.query(sql, [nama_event, tanggal, status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Gagal update event" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }

    res.json({ message: "Event berhasil diupdate" });
  });
});

app.delete("/events/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM events WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Gagal menghapus event" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }

    res.json({ message: "Event berhasil dihapus" });
  });
});


// API REPORT: total tiket per event
app.get("/reports/tickets-per-event", (req, res) => {
  const sql = `
    SELECT event AS nama_event, SUM(jumlah) AS total_tiket
    FROM orders
    GROUP BY event
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Gagal mengambil laporan tiket",
      });
    }

    res.json(results);
  });
});
