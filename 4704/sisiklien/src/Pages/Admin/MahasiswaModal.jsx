import { useEffect, useState } from "react";
import Modal from "@/Pages/Layouts/Components/Modal";
import Form from "@/Pages/Layouts/Components/Form";
import Input from "@/Pages/Layouts/Components/Input";
import Label from "@/Pages/Layouts/Components/Label";
import Button from "@/Pages/Layouts/Components/Button";

const MahasiswaModal = ({ isModalOpen, onClose, onSubmit, selectedMahasiswa, mahasiswaList }) => {
  const [form, setForm] = useState({ nim: "", nama: "", status: true });
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedMahasiswa) {
      setForm({ ...selectedMahasiswa });
    } else {
      setForm({ nim: "", nama: "", status: true });
    }
    setError("");
  }, [selectedMahasiswa, isModalOpen]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") {
      setForm((prev) => ({ ...prev, status: value === "true" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nim.trim() || !form.nama.trim()) {
      setError("NIM dan Nama wajib diisi!");
      return;
    }
    if (!selectedMahasiswa && mahasiswaList.some((m) => m.nim === form.nim.trim())) {
      setError("NIM sudah terdaftar!");
      return;
    }
    if (selectedMahasiswa && !window.confirm("Yakin update data mahasiswa ini?")) return;
    onSubmit(form);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">
          {selectedMahasiswa ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
        </h3>
        {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="nim">NIM</Label>
          <Input
            type="text"
            name="nim"
            value={form.nim}
            placeholder="Masukkan NIM"
            required
            className="mb-2"
            onChange={handleChange}
            disabled={!!selectedMahasiswa}
          />
          <Label htmlFor="nama">Nama</Label>
          <Input
            type="text"
            name="nama"
            value={form.nama}
            placeholder="Masukkan Nama"
            required
            className="mb-2"
            onChange={handleChange}
          />
          <Label htmlFor="status">Status</Label>
          <select
            name="status"
            value={form.status ? "true" : "false"}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 mb-2"
            onChange={handleChange}
          >
            <option value="true">Aktif</option>
            <option value="false">Tidak Aktif</option>
          </select>
          <Button type="submit" className="w-full mt-2">
            {selectedMahasiswa ? "Update" : "Tambah"}
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default MahasiswaModal;
