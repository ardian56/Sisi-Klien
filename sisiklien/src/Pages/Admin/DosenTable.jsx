import Button from "@/Pages/Layouts/Components/Button";

const DosenTable = ({ dosen = [], openEditModal, onDelete, onDetail, user, isLoading }) => {
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
          <th className="py-2 px-4 text-left">NIDN</th>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">Email</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {dosen && dosen.length > 0 ? dosen.map((dsn, index) => (
          <tr
            key={dsn.nidn}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          >
            <td className="py-2 px-4">{dsn.nidn}</td>
            <td className="py-2 px-4">{dsn.nama}</td>
            <td className="py-2 px-4">{dsn.email}</td>
            <td className="py-2 px-4 text-center space-x-2">
              {onDetail && <Button onClick={() => onDetail(dsn.id)}>Detail</Button>}
              {user?.permission?.includes("dosen.update") && (
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => openEditModal(dsn.nidn)}
                >
                  Edit
                </Button>
              )}
              {user?.permission?.includes("dosen.delete") && (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(dsn.id)}
                >
                  Hapus
                </Button>
              )}
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan="4" className="py-4 text-center text-gray-500">
              Tidak ada data dosen
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DosenTable;
