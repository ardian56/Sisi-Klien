import Button from "@/Pages/Layouts/Components/Button";

const MahasiswaTable = ({ mahasiswa = [], openEditModal, onDelete, onDetail, user, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">NIM</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">Status</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {mahasiswa && mahasiswa.length > 0 ? mahasiswa.map((mhs, index) => (
          <tr
            key={mhs.nim}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          >
            <td className="py-2 px-4">{mhs.nim}</td>
            <td className="py-2 px-4">{mhs.nama}</td>
            <td className="py-2 px-4">{mhs.status ? "Aktif" : "Tidak Aktif"}</td>
            <td className="py-2 px-4 text-center space-x-2">
              {onDetail && <Button onClick={() => onDetail(mhs.id)}>Detail</Button>}
              {user?.permission?.includes("mahasiswa.update") && (
              <Button
                size="sm"
                variant="warning"
                onClick={() => openEditModal(mhs.nim)}
              >
                Edit
              </Button>
              )}
            {user?.permission?.includes("mahasiswa.delete") && (
              <Button size="sm" variant="danger" onClick={() => onDelete(mhs.id)}> Hapus </Button>
              )}
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
              Tidak ada data mahasiswa
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default MahasiswaTable;
