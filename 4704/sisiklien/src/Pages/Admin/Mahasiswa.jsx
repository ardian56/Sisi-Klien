import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";


import { mahasiswaList as initialMahasiswaList } from "@/Data/Dummy";
import Modal from "@/Pages/Layouts/Components/Modal";
import Form from "@/Pages/Layouts/Components/Form";
import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";
import { useState } from "react";


const Mahasiswa = () => {
  // State utama
  const [mahasiswa, setMahasiswa] = useState(
    initialMahasiswaList.map((m) => ({ ...m, status: true }))
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  const [formData, setFormData] = useState({ nim: "", nama: "", status: true });
  const [formError, setFormError] = useState("");
  const [editIndex, setEditIndex] = useState(null);


  // Modal open/close
  const openAddModal = () => {
    setFormData({ nim: "", nama: "", status: true });
    setFormError("");
    setModalMode("add");
    setModalOpen(true);
    setEditIndex(null);
  };

  const openEditModal = (idx) => {
    setFormData({ ...mahasiswa[idx] });
    setFormError("");
    setModalMode("edit");
    setModalOpen(true);
    setEditIndex(idx);
  };

  // Event Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setFormData((prev) => ({ ...prev, status: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation: required fields
    if (!formData.nim.trim() || !formData.nama.trim()) {
      setFormError("NIM dan Nama wajib diisi!");
      return;
    }
    // Validation: unique NIM (add mode)
    if (
      modalMode === "add" &&
      mahasiswa.some((m) => m.nim === formData.nim.trim())
    ) {
      setFormError("NIM sudah terdaftar!");
      return;
    }
    // Update state
    if (modalMode === "add") {
      setMahasiswa((prev) => [
        ...prev,
        { nim: formData.nim.trim(), nama: formData.nama.trim(), status: formData.status },
      ]);
    } else if (modalMode === "edit" && editIndex !== null) {
      if (!window.confirm("Yakin update data mahasiswa ini?")) return;
      setMahasiswa((prev) =>
        prev.map((m, idx) =>
          idx === editIndex
            ? { ...m, nama: formData.nama.trim(), status: formData.status }
            : m
        )
      );
    }
    setModalOpen(false);
  };

  // Table rendering & actions
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">Daftar Mahasiswa</Heading>
        <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIM</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mhs, index) => (
            <tr
              key={mhs.nim}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="py-2 px-4">{mhs.nim}</td>
              <td className="py-2 px-4">{mhs.nama}</td>
              <td className="py-2 px-4">{mhs.status ? "Aktif" : "Tidak Aktif"}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <a
                  href={`/admin/mahasiswa/${mhs.nim}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                >
                  Detail
                </a>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => openEditModal(index)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    if (window.confirm(`Yakin ingin hapus ${mhs.nama}?`)) {
                      setMahasiswa((prev) => prev.filter((_, idx) => idx !== index));
                    }
                  }}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Form (add/edit) - logic & validation next step */}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">
              {modalMode === "add" ? "Tambah Mahasiswa" : "Edit Mahasiswa"}
            </h3>
            {formError && (
              <div className="mb-2 text-red-600 text-sm">{formError}</div>
            )}
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="nim">NIM</Label>
              <Input
                type="text"
                name="nim"
                value={formData.nim}
                placeholder="Masukkan NIM"
                required
                className="mb-2"
                onChange={handleChange}
                disabled={modalMode === "edit"}
              />
              <Label htmlFor="nama">Nama</Label>
              <Input
                type="text"
                name="nama"
                value={formData.nama}
                placeholder="Masukkan Nama"
                required
                className="mb-2"
                onChange={handleChange}
              />
              <Label htmlFor="status">Status</Label>
              <select
                name="status"
                value={formData.status ? "true" : "false"}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 mb-2"
                onChange={handleChange}
              >
                <option value="true">Aktif</option>
                <option value="false">Tidak Aktif</option>
              </select>
              <Button type="submit" className="w-full mt-2">
                {modalMode === "add" ? "Tambah" : "Update"}
              </Button>
            </Form>
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default Mahasiswa;