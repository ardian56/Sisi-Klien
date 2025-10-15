// src/Pages/Admin/Mahasiswa.jsx

import React, { useState } from "react";
import AdminLayout from "@/Pages/Layouts/AdminLayout";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import Modal from "@/Pages/Layouts/Components/Modal";
import Form from "@/Pages/Layouts/Components/Form";
import Label from "@/Pages/Layouts/Components/Label";
import Input from "@/Pages/Layouts/Components/Input";

const Mahasiswa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (nama) => alert(`Edit data ${nama}`);
  const handleDelete = (nama) => {
    if (confirm(`Yakin ingin hapus ${nama}?`)) alert("Data berhasil dihapus!");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Mahasiswa berhasil ditambah!");
    closeModal();
  };

  return (
    <AdminLayout>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
          <Button onClick={openModal}>+ Tambah Mahasiswa</Button>
        </div>

        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">NIM</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* Contoh data statis */}
            <tr className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4">20211001</td>
              <td className="py-2 px-4">Budi Santoso</td>
              <td className="py-2 px-4 text-center space-x-2">
                <Button size="sm" variant="warning" onClick={() => handleEdit("Budi Santoso")}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete("Budi Santoso")}>
                  Hapus
                </Button>
              </td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-100">
              <td className="py-2 px-4">20211002</td>
              <td className="py-2 px-4">Siti Aminah</td>
              <td className="py-2 px-4 text-center space-x-2">
                <Button size="sm" variant="warning" onClick={() => handleEdit("Siti Aminah")}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete("Siti Aminah")}>
                  Hapus
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Tambah Mahasiswa">
        <Form onSubmit={handleFormSubmit}>
          <div>
            <Label htmlFor="nim">NIM</Label>
            <Input type="text" name="nim" placeholder="Masukkan NIM" required />
          </div>
          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input type="text" name="nama" placeholder="Masukkan Nama" required />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button" variant="secondary" onClick={closeModal}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default Mahasiswa;