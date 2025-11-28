import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmDialog } from "@/Utils/Helpers/swalHelper";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import MataKuliahTable from "./MataKuliahTable";
import MataKuliahModal from "./MataKuliahModal";
import {
  useMataKuliah,
  useStoreMataKuliah,
  useUpdateMataKuliah,
  useDeleteMataKuliah,
} from "@/Utils/Hooks/useMataKuliah";

const MataKuliah = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();
  
  const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sort, setSort] = useState("nama");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const {
    data: result = { data: [], total: 0 },
    isLoading,
  } = useMataKuliah({
    q: search,
    _sort: sort,
    _order: order,
    _page: page,
    _limit: perPage,
  });

  const { data: mataKuliah = [] } = result;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / perPage);

  const { mutate: store } = useStoreMataKuliah();
  const { mutate: update } = useUpdateMataKuliah();
  const { mutate: remove } = useDeleteMataKuliah();

  const openAddModal = () => {
    setSelectedMataKuliah(null);
    setModalOpen(true);
  };

  const openEditModal = (kode) => {
    const mk = mataKuliah.find((m) => m.kode === kode);
    setSelectedMataKuliah(mk);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    if (selectedMataKuliah) {
      const result = await confirmDialog({
        title: "Konfirmasi Update",
        text: "Yakin ingin simpan perubahan data mata kuliah?",
        icon: "question",
        confirmButtonText: "Ya, Simpan",
        cancelButtonText: "Batal"
      });
      if (result.isConfirmed) {
        update({ id: selectedMataKuliah.id, data: form });
        setModalOpen(false);
      }
    } else {
      store(form);
      setModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await confirmDialog({
      title: "Konfirmasi Hapus",
      text: "Yakin ingin hapus data mata kuliah ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal"
    });
    if (result.isConfirmed) {
      remove(id);
    }
  };

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">Daftar Mata Kuliah</Heading>
        {user?.permission?.includes("matakuliah.create") && (
          <Button onClick={openAddModal}>+ Tambah Mata Kuliah</Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Cari nama/kode..."
          className="border px-3 py-1 rounded flex-grow"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="nama">Sort by Nama</option>
          <option value="kode">Sort by Kode</option>
          <option value="sks">Sort by SKS</option>
        </select>

        <select
          value={order}
          onChange={(e) => {
            setOrder(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {user?.permission?.includes("matakuliah.read") && (
        <MataKuliahTable 
          mataKuliah={mataKuliah} 
          openEditModal={openEditModal} 
          onDelete={handleDelete}
          onDetail={(id) => navigate(`/admin/matakuliah/${id}`)}
          user={user}
          isLoading={isLoading}
        />
      )}

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">
          Halaman {page} dari {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <MataKuliahModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMataKuliah={selectedMataKuliah}
        mataKuliahList={mataKuliah}
      />
    </Card>
  );
};

export default MataKuliah;
