import React from "react";
import { useParams } from "react-router-dom";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import { useKelas } from "@/Utils/Hooks/useKelas";

const KelasDetail = () => {
  const { id } = useParams();
  const { data: result = { data: [] } } = useKelas();
  const kelas = result.data.find((k) => k.id === id);

  if (!kelas) return (
    <Card><p className="text-center py-8">Data tidak ditemukan</p></Card>
  );

  return (
    <Card>
      <Heading as="h2" className="mb-4 text-left">Detail Kelas</Heading>
      <div className="space-y-3">
        <div className="flex border-b pb-2">
          <span className="font-semibold w-32">Nama Kelas:</span>
          <span>{kelas.nama}</span>
        </div>
        <div className="flex border-b pb-2">
          <span className="font-semibold w-32">Tahun Ajaran:</span>
          <span>{kelas.tahun_ajaran}</span>
        </div>
        <div className="flex border-b pb-2">
          <span className="font-semibold w-32">Semester:</span>
          <span>{kelas.semester}</span>
        </div>
      </div>
    </Card>
  );
};

export default KelasDetail;
