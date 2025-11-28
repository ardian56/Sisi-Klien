import React from "react";
import { useParams } from "react-router-dom";
import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import { useMahasiswa } from "@/Utils/Hooks/useMahasiswa";

const MahasiswaDetail = () => {
  const { id } = useParams();
  const { data: result = { data: [] } } = useMahasiswa();
  const mahasiswa = result.data.find((m) => m.id === id);

  if (!mahasiswa) return (
    <Card>
      <p className="text-center py-8">Data tidak ditemukan</p>
    </Card>
  );

  return (
    <Card>
      <Heading as="h2" className="mb-4 text-left">Detail Mahasiswa</Heading>
      <table className="table-auto text-sm w-full">
        <tbody>
          <tr>
            <td className="py-2 px-4 font-medium">NIM</td>
            <td className="py-2 px-4">{mahasiswa.nim}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">Nama</td>
            <td className="py-2 px-4">{mahasiswa.nama}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default MahasiswaDetail;