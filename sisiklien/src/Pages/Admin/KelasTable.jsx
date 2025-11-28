import Button from "@/Pages/Layouts/Components/Button";

const KelasTable = ({ kelas = [], openEditModal, onDelete, onDetail, user, isLoading, mahasiswaData }) => {
  if (isLoading) {
    return <div className="text-center py-8"><p>Loading...</p></div>;
  }

  const getMahasiswaCount = (kelasId) => {
    return mahasiswaData?.data?.filter(mhs => mhs.kelas_id === kelasId).length || 0;
  };

  const getMataKuliahCount = (kls) => {
    return kls.matakuliah_list?.length || 0;
  };

  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Nama Kelas</th>
          <th className="py-2 px-4 text-left">Tahun Ajaran</th>
          <th className="py-2 px-4 text-left">Semester</th>
          <th className="py-2 px-4 text-center">Mata Kuliah</th>
          <th className="py-2 px-4 text-center">Mahasiswa</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {kelas && kelas.length > 0 ? kelas.map((kls, index) => (
          <tr key={kls.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="py-2 px-4 font-semibold">{kls.nama}</td>
            <td className="py-2 px-4">{kls.tahun_ajaran}</td>
            <td className="py-2 px-4">{kls.semester}</td>
            <td className="py-2 px-4 text-center">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                {getMataKuliahCount(kls)} MK
              </span>
            </td>
            <td className="py-2 px-4 text-center">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                {getMahasiswaCount(kls.id)} Mhs
              </span>
            </td>
            <td className="py-2 px-4 text-center space-x-2">
              {onDetail && <Button onClick={() => onDetail(kls.id)}>Detail</Button>}
              {user?.permission?.includes("kelas.update") && (
                <Button size="sm" variant="warning" onClick={() => openEditModal(kls.nama)}>Edit</Button>
              )}
              {user?.permission?.includes("kelas.delete") && (
                <Button size="sm" variant="danger" onClick={() => onDelete(kls.id)}>Hapus</Button>
              )}
            </td>
          </tr>
        )) : (
          <tr><td colSpan="6" className="py-4 text-center text-gray-500">Tidak ada data kelas</td></tr>
        )}
      </tbody>
    </table>
  );
};

export default KelasTable;
