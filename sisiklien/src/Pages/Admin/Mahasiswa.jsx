import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useState } from "react";
import { confirmDialog } from "@/Utils/Helpers/swalHelper";
import { showSuccess, showError } from "@/Utils/Helpers/toastHelper";
import { mahasiswaList as initialMahasiswaList } from "@/Data/Dummy";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";


const Mahasiswa = () => {
  // State utama
  const [mahasiswa, setMahasiswa] = useState(
    initialMahasiswaList.map((m) => ({ ...m, status: true }))
  );
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // CRUD logic
  const storeMahasiswa = (data) => {
    setMahasiswa((prev) => [
      ...prev,
      { nim: data.nim.trim(), nama: data.nama.trim(), status: data.status },
    ]);
    showSuccess("Data mahasiswa berhasil ditambahkan!");
  };

  const updateMahasiswa = async (data) => {
    const result = await confirmDialog({
      title: "Konfirmasi Update",
      text: "Yakin ingin simpan perubahan data mahasiswa?",
      icon: "question",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal"
    });
    if (result.isConfirmed) {
      setMahasiswa((prev) =>
        prev.map((m) =>
          m.nim === data.nim ? { ...m, nama: data.nama.trim(), status: data.status } : m
        )
      );
      showSuccess("Data mahasiswa berhasil diupdate!");
    } else {
      showInfo && showInfo("Update dibatalkan.");
    }
  };

  const deleteMahasiswa = async (nim) => {
    const result = await confirmDialog({
      title: "Konfirmasi Hapus",
      text: "Yakin ingin hapus data mahasiswa ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal"
    });
    if (result.isConfirmed) {
      setMahasiswa((prev) => prev.filter((m) => m.nim !== nim));
      showSuccess("Data mahasiswa berhasil dihapus!");
    } else {
      showInfo && showInfo("Penghapusan dibatalkan.");
    }
  };

  // Modal logic
  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (nim) => {
    const mhs = mahasiswa.find((m) => m.nim === nim);
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  // Submit logic
  const handleSubmit = (form) => {
    if (selectedMahasiswa) {
      updateMahasiswa(form);
    } else {
      storeMahasiswa(form);
    }
  };

  // Delete handler
  const handleDelete = (nim) => {
    deleteMahasiswa(nim);
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
        <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
      </div>
      <MahasiswaTable mahasiswa={mahasiswa} openEditModal={openEditModal} onDelete={handleDelete} />
      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
        mahasiswaList={mahasiswa}
      />
    </Card>
  );
};

export default Mahasiswa;