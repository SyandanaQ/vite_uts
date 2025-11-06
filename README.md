project:
  title: "🎟️ Event Ticket Booking App (UTS PSKL)"
  description: >
    Proyek ini dibuat sebagai tugas UTS Pemrograman Sisi Klien (PSKL). 
    Aplikasi ini menampilkan sistem pemesanan tiket acara dengan fitur login sederhana
    dan proteksi halaman menggunakan React, Tailwind CSS, dan React Router DOM.

features:
  - section: "Struktur Halaman"
    items:
      - Home Page: "Halaman utama berisi informasi event."
      - Events Page: "Menampilkan daftar acara yang tersedia."
      - Order Page: "Form pemesanan tiket acara."
      - Login Page: "Halaman login untuk admin/user."
      - Admin Page: "Hanya bisa diakses setelah login."
  - section: "Komponen Reusable"
    items:
      - "Button.jsx dan Input.jsx dibuat sebagai komponen reusable menggunakan konsep Atomic Design (atoms)."
      - "Layout utama diatur melalui Layout.jsx dengan struktur Header, Main, Footer."
  - section: "Fitur Login & Proteksi Halaman"
    items:
      - "Menggunakan React Context (AuthContext.jsx) untuk menyimpan status login."
      - "Terdapat fungsi login() dan logout()."
      - "Halaman /order dan /admin dilindungi dengan ProtectedRoute."
      - "Jika user belum login, otomatis diarahkan ke halaman /login."
  - section: "Teknologi & Tools"
    items:
      - "⚡ React + Vite"
      - "🎨 Tailwind CSS"
      - "🧭 React Router DOM"
      - "🧱 Lucide React Icons"
      - "⚙️ Context API + Hooks (useState, useContext, useNavigate)"

structure:
  src:
    components:
      atoms:
        - Button.jsx
        - Input.jsx
      templates:
        - Layout.jsx
        - Navbar.jsx
      molecules:
        - (opsional)
    context:
      - AuthContext.jsx
    pages:
      - Home.jsx
      - Events.jsx
      - Order.jsx
      - Login.jsx
      - Admin.jsx
    routes:
      - ProtectedRoute.jsx
    root_files:
      - App.jsx
      - main.jsx

setup:
  - step: "Clone repository"
    command: |
      git clone https://github.com/syandanaq/vite_uts.git
      cd vite-uts
  - step: "Install dependencies"
    command: npm install
  - step: "Jalankan server lokal"
    command: npm run dev
  - step: "Akses aplikasi"
    url: "http://localhost:5173/"

login:
  username: "admin"
  password: "123"
  note: "Validasi belum diterapkan, hanya simulasi login."

concepts:
  - useState: "Untuk mengatur input dan data lokal form."
  - useContext: "Untuk mengatur status login global."
  - useNavigate: "Untuk navigasi otomatis setelah login/logout."
  - ProtectedRoute: "Untuk membatasi akses halaman tertentu."

  note: >
    Proyek ini dibuat untuk memenuhi UTS dan menunjukkan penerapan React, 
    Tailwind, Context API, serta React Router DOM secara terpadu.
