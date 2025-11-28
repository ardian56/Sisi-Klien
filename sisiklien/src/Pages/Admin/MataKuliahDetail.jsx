import React from "react";
import { useParams } from "react-router-dom";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import { useMataKuliah } from "@/Utils/Hooks/useMataKuliah";

const MataKuliahDetail = () => {
  const { id } = useParams();
  const { data: result = { data: [] } } = useMataKuliah();
  const mataKuliah = result.data.find((m) => m.id === id);

  if (!mataKuliah) return (
    <Card><p className="text-center py-8">Data tidak ditemukan</p></Card>
  );

  return (
    <Card>
      <Heading as="h2" className="mb-4 text-left">Detail Mata Kuliah</Heading>
      <div className="space-y-3">
        <div className="flex border-b pb-2">
          <span className="font-semibold w-32">Kode:</span>
          <span>{mataKuliah.kode}</span>
        </div>
        <div className="flex border-b pb-2">
          <span className="font-semibold w-32">Nama:</span>
          <span>{mataKuliah.nama}</span>
        </div>
        <div className="flex border-b pb-2">
          <span className="font-semibold w-32">SKS:</span>
          <span>{mataKuliah.sks}</span>
        </div>
      </div>
    </Card>
  );
};

export default MataKuliahDetail;
