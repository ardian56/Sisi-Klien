import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmDialog } from "@/Utils/Helpers/swalHelper";
import { showSuccess, showError } from "@/Utils/Helpers/toastHelper";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import {
  getAllMahasiswa,
  storeMahasiswa as apiStoreMahasiswa,
  updateMahasiswa as apiUpdateMahasiswa,
  deleteMahasiswa as apiDeleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi";


const Mahasiswa = () => {
  const navigate = useNavigate();
  
  // State utama
  const [mahasiswa, setMahasiswa] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch data saat component mount
  useEffect(() => {
    fetchMahasiswa();
  }, []);

  // Fetch data dari API
  const fetchMahasiswa = async () => {
    try {
      const response = await getAllMahasiswa();
      setMahasiswa(response.data);
    } catch (error) {
      showError("Gagal memuat data mahasiswa");
      console.error(error);
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

  // CRUD operations
  const handleSubmit = async (data) => {
    try {
      if (selectedMahasiswa) {
        // Update
        const result = await confirmDialog({
          title: "Konfirmasi Update",
          text: "Yakin ingin simpan perubahan data mahasiswa?",
          icon: "question",
          confirmButtonText: "Ya, Simpan",
          cancelButtonText: "Batal"
        });
        if (result.isConfirmed) {
          await apiUpdateMahasiswa(selectedMahasiswa.id, data);
          showSuccess("Data mahasiswa berhasil diupdate!");
          fetchMahasiswa();
        }
      } else {
        // Create
        await apiStoreMahasiswa(data);
        showSuccess("Data mahasiswa berhasil ditambahkan!");
        fetchMahasiswa();
      }
      setModalOpen(false);
    } catch (error) {
      showError(error.message || "Terjadi kesalahan");
    }
  };

  const handleDelete = async (id) => {
    const result = await confirmDialog({
      title: "Konfirmasi Hapus",
      text: "Yakin ingin hapus data mahasiswa ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal"
    });
    if (result.isConfirmed) {
      try {
        await apiDeleteMahasiswa(id);
        showSuccess("Data mahasiswa berhasil dihapus!");
        fetchMahasiswa();
      } catch (error) {
        showError(error.message || "Gagal menghapus data");
      }
    }
  };


  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
        <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
      </div>
      <MahasiswaTable 
        mahasiswa={mahasiswa} 
        openEditModal={openEditModal} 
        onDelete={handleDelete}
        onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
      />
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