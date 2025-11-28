import Button from "@/Pages/Layouts/Components/Button";

const KelasTable = ({ kelas = [], openEditModal, onDelete, onDetail, user, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-8"><p>Loading...</p></div>;
  }

  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Nama Kelas</th>
          <th className="py-2 px-4 text-left">Tahun Ajaran</th>
          <th className="py-2 px-4 text-left">Semester</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {kelas && kelas.length > 0 ? kelas.map((kls, index) => (
          <tr key={kls.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="py-2 px-4">{kls.nama}</td>
            <td className="py-2 px-4">{kls.tahun_ajaran}</td>
            <td className="py-2 px-4">{kls.semester}</td>
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
          <tr><td colSpan="4" className="py-4 text-center text-gray-500">Tidak ada data kelas</td></tr>
        )}
      </tbody>
    </table>
  );
};

export default KelasTable;
