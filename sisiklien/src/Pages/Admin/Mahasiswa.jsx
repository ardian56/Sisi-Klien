import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmDialog } from "@/Utils/Helpers/swalHelper";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import {
  useMahasiswa,
  useStoreMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
} from "@/Utils/Hooks/useMahasiswa";
import { useKelas } from "@/Utils/Hooks/useKelas";
import { useMataKuliah } from "@/Utils/Hooks/useMataKuliah";


const Mahasiswa = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();
  
  // State utama
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // React Query hooks
  const { data: mahasiswa = [] } = useMahasiswa();
  const { data: kelas = [] } = useKelas();
  const { data: mataKuliah = [] } = useMataKuliah();
  
  const { mutate: store } = useStoreMahasiswa();
  const { mutate: update } = useUpdateMahasiswa();
  const { mutate: remove } = useDeleteMahasiswa();

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (nim) => {
    const mhs = mahasiswa.find((m) => m.nim === nim);
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
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
        update({ id: selectedMahasiswa.id, data: form });
        setModalOpen(false);
      }
    } else {
      // Create
      store(form);
      setModalOpen(false);
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
      remove(id);
    }
  };


  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
        {user?.permission?.includes("mahasiswa.create") && (
        <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        )}
      </div>
      {user?.permission?.includes("mahasiswa.read") && (
      <MahasiswaTable 
        mahasiswa={mahasiswa} 
        openEditModal={openEditModal} 
        onDelete={handleDelete}
        onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
        user={user}
      />
      )}
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