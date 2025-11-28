import { useEffect, useState } from "react";
import Button from "@/Pages/Layouts/Components/Button";

const DosenModal = ({ isModalOpen, onClose, onSubmit, selectedDosen, dosenList }) => {
  const [formData, setFormData] = useState({
    nidn: "",
    nama: "",
    email: "",
    no_telp: "",
  });

  useEffect(() => {
    if (selectedDosen) {
      setFormData({
        nidn: selectedDosen.nidn || "",
        nama: selectedDosen.nama || "",
        email: selectedDosen.email || "",
        no_telp: selectedDosen.no_telp || "",
      });
    } else {
      setFormData({ nidn: "", nama: "", email: "", no_telp: "" });
    }
  }, [selectedDosen, isModalOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nidn: "", nama: "", email: "", no_telp: "" });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {selectedDosen ? "Edit Dosen" : "Tambah Dosen"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">NIDN</label>
            <input
              type="text"
              name="nidn"
              value={formData.nidn}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
              disabled={!!selectedDosen}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">No. Telp</label>
            <input
              type="text"
              name="no_telp"
              value={formData.no_telp}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DosenModal;
