import Button from "@/Pages/Layouts/Components/Button";

const MataKuliahTable = ({ mataKuliah = [], openEditModal, onDelete, onDetail, user, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-8"><p>Loading...</p></div>;
  }

  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Kode</th>
          <th className="py-2 px-4 text-left">Nama Mata Kuliah</th>
          <th className="py-2 px-4 text-center">SKS</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {mataKuliah && mataKuliah.length > 0 ? mataKuliah.map((mk, index) => (
          <tr key={mk.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="py-2 px-4">{mk.kode}</td>
            <td className="py-2 px-4">{mk.nama}</td>
            <td className="py-2 px-4 text-center">{mk.sks}</td>
            <td className="py-2 px-4 text-center space-x-2">
              {onDetail && <Button onClick={() => onDetail(mk.id)}>Detail</Button>}
              {user?.permission?.includes("matakuliah.update") && (
                <Button size="sm" variant="warning" onClick={() => openEditModal(mk.kode)}>Edit</Button>
              )}
              {user?.permission?.includes("matakuliah.delete") && (
                <Button size="sm" variant="danger" onClick={() => onDelete(mk.id)}>Hapus</Button>
              )}
            </td>
          </tr>
        )) : (
          <tr><td colSpan="4" className="py-4 text-center text-gray-500">Tidak ada data mata kuliah</td></tr>
        )}
      </tbody>
    </table>
  );
};

export default MataKuliahTable;
