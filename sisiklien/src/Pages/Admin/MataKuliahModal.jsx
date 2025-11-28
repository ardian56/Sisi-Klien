import { useEffect, useState } from "react";
import Button from "@/Pages/Layouts/Components/Button";

const MataKuliahModal = ({ isModalOpen, onClose, onSubmit, selectedMataKuliah }) => {
  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    sks: 2,
  });

  useEffect(() => {
    if (selectedMataKuliah) {
      setFormData({
        kode: selectedMataKuliah.kode || "",
        nama: selectedMataKuliah.nama || "",
        sks: selectedMataKuliah.sks || 2,
      });
    } else {
      setFormData({ kode: "", nama: "", sks: 2 });
    }
  }, [selectedMataKuliah, isModalOpen]);

  const handleChange = (e) => {
    const value = e.target.name === "sks" ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ kode: "", nama: "", sks: 2 });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {selectedMataKuliah ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Kode MK</label>
            <input
              type="text"
              name="kode"
              value={formData.kode}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              placeholder="A11.54501"
              disabled={!!selectedMataKuliah}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nama Mata Kuliah</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              placeholder="Pemrograman Web"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">SKS</label>
            <input
              type="number"
              name="sks"
              value={formData.sks}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              min="1"
              max="6"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MataKuliahModal;
