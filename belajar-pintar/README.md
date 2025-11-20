# Belajar Pintar

Platform Pembelajaran Digital untuk Mahasiswa

## Deskripsi

Belajar Pintar adalah aplikasi React yang menampilkan daftar kelas atau modul pembelajaran. Pengguna dapat melihat struktur modul per bab, melacak progress belajar, dan membuka fitur tanya jawab dengan dosen melalui modal simulasi.

## Fitur Utama

### 1. Halaman Login
- Login menggunakan data dummy
- Info user disimpan di localStorage
- Redirect ke /admin/dashboard setelah login berhasil
- Toast notification untuk login berhasil
- SweetAlert2 untuk konfirmasi logout

**Akun Demo:**
- Username: `ardian`
- Password: `123456`

### 2. Halaman Dashboard
- Menampilkan nama mahasiswa
- Progress bar menunjukkan progres belajar
- Statistik total modul dan modul selesai
- Tombol "Lanjutkan Belajar" menuju /admin/kelas

### 3. Halaman Modul/Kelas
- Daftar materi dalam bentuk Accordion
- Hanya satu accordion yang bisa dibuka sekaligus
- Setiap accordion memiliki:
  - Judul Materi
  - Deskripsi
  - Tombol "Tandai Selesai"
  - Tombol "Tanya Dosen"
- Progress bar update otomatis ketika materi ditandai selesai
- Modal "Tanya Dosen" dengan textarea dan tombol kirim
- Toast notification setelah pertanyaan dikirim

## Teknologi yang Digunakan

- React 19
- React Router DOM 7
- Tailwind CSS 3
- React Hot Toast
- SweetAlert2
- Vite

## Instalasi

```bash
# Clone atau download project
cd belajar-pintar

# Install dependencies
npm install

# Jalankan aplikasi
npm run dev
```

## Struktur Folder

```
belajar-pintar/
├── src/
│   ├── Components/
│   │   ├── Accordion.jsx
│   │   ├── Modal.jsx
│   │   └── ProgressBar.jsx
│   ├── Pages/
│   │   ├── Admin/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Kelas.jsx
│   │   ├── Auth/
│   │   │   └── Login.jsx
│   │   └── Layouts/
│   │       ├── AdminLayout.jsx
│   │       └── ProtectedRoute.jsx
│   ├── Utils/
│   │   └── dummyData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Cara Menggunakan

1. Buka aplikasi di browser (http://localhost:5173)
2. Login dengan username: `ardian` dan password: `123456`
3. Anda akan diarahkan ke Dashboard
4. Klik "Lanjutkan Belajar" untuk melihat daftar modul
5. Klik pada modul untuk membuka detail
6. Tandai modul sebagai selesai atau tanya dosen
7. Progress akan ter-update otomatis
8. Klik Logout untuk keluar dari aplikasi

## Prinsip yang Digunakan

- **Component-based Architecture**: Komponen reusable dan terpisah
- **State Management Lokal**: Menggunakan useState dan lifting state
- **Props Drilling**: Komunikasi antar komponen via props
- **Protected Routes**: Autentikasi dengan localStorage
- **Responsive Design**: Tampilan adaptif dengan Tailwind CSS

## Dibuat oleh

Ardian Danendra

## Lisensi

MIT License
