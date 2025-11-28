import React from "react";
import { useParams } from "react-router-dom";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import { useDosen } from "@/Utils/Hooks/useDosen";

const DosenDetail = () => {
  const { id } = useParams();
  const { data: result = { data: [] } } = useDosen();
  const dosen = result.data.find((d) => d.id === id);

  if (!dosen) return (
    <Card>
      <p className="text-center py-8">Data tidak ditemukan</p>
    </Card>
  );

  return (
    <Card>
      <Heading as="h2" className="mb-4 text-left">Detail Dosen</Heading>
      <div className="space-y-3">
        <div className="flex border-b pb-2">
          <span className="font-semibold w-32">NIDN:</span>
          <span>{dosen.nidn}</span>
        </div>
        <div className="flex border-b pb-2">
          <span className="font-semibold w-32">Nama:</span>
          <span>{dosen.nama}</span>
        </div>
        <div className="flex border-b pb-2">
          <span className="font-semibold w-32">Email:</span>
          <span>{dosen.email}</span>
        </div>
        <div className="flex border-b pb-2">
          <span className="font-semibold w-32">No. Telp:</span>
          <span>{dosen.no_telp || "-"}</span>
        </div>
      </div>
    </Card>
  );
};

export default DosenDetail;
