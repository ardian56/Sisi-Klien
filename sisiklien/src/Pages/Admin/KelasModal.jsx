import { useEffect, useState } from "react";
import Button from "@/Pages/Layouts/Components/Button";

const KelasModal = ({ isModalOpen, onClose, onSubmit, selectedKelas }) => {
  const [formData, setFormData] = useState({
    nama: "",
    tahun_ajaran: "",
    semester: "Ganjil",
  });

  useEffect(() => {
    if (selectedKelas) {
      setFormData({
        nama: selectedKelas.nama || "",
        tahun_ajaran: selectedKelas.tahun_ajaran || "",
        semester: selectedKelas.semester || "Ganjil",
      });
    } else {
      setFormData({ nama: "", tahun_ajaran: "", semester: "Ganjil" });
    }
  }, [selectedKelas, isModalOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nama: "", tahun_ajaran: "", semester: "Ganjil" });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {selectedKelas ? "Edit Kelas" : "Tambah Kelas"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nama Kelas</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              placeholder="A11.4501"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tahun Ajaran</label>
            <input
              type="text"
              name="tahun_ajaran"
              value={formData.tahun_ajaran}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              placeholder="2024/2025"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="Ganjil">Ganjil</option>
              <option value="Genap">Genap</option>
            </select>
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

export default KelasModal;
