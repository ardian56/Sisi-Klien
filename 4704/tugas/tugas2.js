const mataKuliahList = {
	mataKuliah: [
		{ kode: 4704, nama: "Pemsik", sks: 3 },
		{ kode: 4771, nama: "Daspro", sks: 3 },
		{ kode: 4890, nama: "Web Lanjutan", sks: 2 },
	],
};

const mahasiswaList = {
	mahasiswa: [
		{
			nim: "A11.2022.14493", 
			nama: "Ardian Danendra",
			status: true,
			matkul: [
				{ matkulId: 4704, tugas: 85, uts: 100, uas: 50 },
				{ matkulId: 4771, tugas: 60, uts: 100, uas: 80 },
			],
		},
		{
			nim: "22002",
			nama: "Budi Haryanto",
			status: true,
			matkul: [
				{ matkulId: 4704, tugas: 95, uts: 100, uas: 50 },
				{ matkulId: 4771, tugas: 65, uts: 100, uas: 80 },
			],
		},
	],
};

// Objek Mahasiswa

// show() – Menampilkan semua data mahasiswa.
const show = () => {
	mahasiswaList.mahasiswa.forEach((mhs) => {
		console.log(`NIM: ${mhs.nim}, Nama: ${mhs.nama}, Status: ${mhs.status ? "Aktif" : "Tidak Aktif"}`);
		console.log("Mata Kuliah:");

		mhs.matkul.forEach((mk) => {
			const ref = mataKuliahList.mataKuliah.find((m) => String(m.kode) === String(mk.matkulId));
			const matkulName = ref ? ref.nama : `MK ${mk.matkulId}`;
			console.log(`- ${matkulName}: Tugas ${mk.tugas}, UTS ${mk.uts}, UAS ${mk.uas}`);
		});
	});
};

show();


// add() – Menambah mahasiswa baru.
const add = (mahasiswa) => mahasiswaList.mahasiswa.push(mahasiswa);

add({
	nim: "22003",
	nama: "Andi Setiawan",
	status: true,
	matkul: [{ matkulId: 4890, tugas: 88, uts: 85, uas: 90 }],
});

console.log("Setelah add:", JSON.stringify(mahasiswaList, null, 2));


// update() – Mengupdate informasi mahasiswa tertentu.
const update = (nim, dataBaru) => {
	mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.map((m) => (m.nim === nim ? { ...m, ...dataBaru } : m));
};

update("A11.2022.14493", { status: false });

console.log("Setelah update:", JSON.stringify(mahasiswaList, null, 2));


// deleteById() – Menghapus mahasiswa berdasarkan NIM.
const deleteById = (nim) => {
	mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.filter((m) => m.nim !== nim);
};

deleteById("22002");

console.log("Setelah deleteById(22002):", JSON.stringify(mahasiswaList, null, 2));


// totalNilai() – Menghitung total nilai mahasiswa dari tugas, UTS, dan UAS.
const totalNilai = (nim) => {
	const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
	if (!mahasiswa) return "Mahasiswa tidak ditemukan";

	return mahasiswa.matkul.map((mk) => {
		const total = mk.tugas + mk.uts + mk.uas;
		return { matkulId: mk.matkulId, total };
	});
};

console.log("Total nilai per MK (Ardian):", totalNilai("A11.2022.14493"));


// kategoriNilai() – Mengelompokkan nilai mahasiswa dalam kategori.
const kategoriNilai = (nilai) => {
	if (nilai >= 85) return "A";
	if (nilai >= 75) return "B";
	if (nilai >= 65) return "C";
	if (nilai >= 50) return "D";
	return "E";
};

console.log("Kategori 88:", kategoriNilai(88)); // Output: A
console.log("Kategori 72:", kategoriNilai(72)); // Output: C


// IPS() – Menghitung Indeks Prestasi Semester (IPS).
const IPS = (nim) => {
	const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
	if (!mahasiswa) return "Mahasiswa tidak ditemukan";

	const totalSks = mahasiswa.matkul.reduce((sum, mk) => {
		const matkul = mataKuliahList.mataKuliah.find((m) => String(m.kode) === String(mk.matkulId));
		return sum + (matkul?.sks || 0);
	}, 0);

	const totalNilaiTertimbang = mahasiswa.matkul.reduce((sum, mk) => {
		const rata = mk.tugas * 0.3 + mk.uts * 0.3 + mk.uas * 0.4;
		const matkul = mataKuliahList.mataKuliah.find((m) => String(m.kode) === String(mk.matkulId));
		return sum + rata * (matkul?.sks || 0);
	}, 0);

	if (!totalSks) return "0.00";
	return (totalNilaiTertimbang / totalSks).toFixed(2);
};

console.log(`IPS Mahasiswa (Ardian): ${IPS("A11.2022.14493")}`);

// clear() – Menghapus semua data mahasiswa.
const clear = () => {
	mahasiswaList.mahasiswa = [];
};



// Array Of Object

// jumlahMahasiswa() – Menghitung jumlah mahasiswa dalam array.
const jumlahMahasiswa = () => mahasiswaList.mahasiswa.length;

console.log(`Jumlah Mahasiswa: ${jumlahMahasiswa()}`);

// sortByNIM() – Mengurutkan mahasiswa berdasarkan NIM.
const sortByNIM = () => mahasiswaList.mahasiswa.sort((a, b) => a.nim.localeCompare(b.nim));

sortByNIM();
console.log("Setelah sortByNIM:", JSON.stringify(mahasiswaList, null, 2));

// jumlahAktifTidak() – Menghitung jumlah mahasiswa aktif dan tidak aktif.
const jumlahAktifTidak = () => {
	return {
		aktif: mahasiswaList.mahasiswa.filter((m) => m.status).length,
		tidakAktif: mahasiswaList.mahasiswa.filter((m) => !m.status).length,
	};
};

console.log("Jumlah Aktif/Tidak:", jumlahAktifTidak());

// clearArray() – Menghapus semua data mahasiswa dari array.
const clearArray = () => {
	clear();
};

