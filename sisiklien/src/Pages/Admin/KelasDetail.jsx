import { useState } from "react";
import { useParams } from "react-router-dom";
import { useKelasDetail } from "../../Utils/Hooks/useKelas";
import { useMataKuliah } from "../../Utils/Hooks/useMataKuliah";
import { useDosen } from "../../Utils/Hooks/useDosen";
import { useMahasiswa } from "../../Utils/Hooks/useMahasiswa";
import { useUpdateKelas } from "../../Utils/Hooks/useKelas";
import Swal from "sweetalert2";

const KelasDetail = () => {
  const { id } = useParams();
  const { data: kelas, isLoading } = useKelasDetail(id);
  const { data: mataKuliahData } = useMataKuliah();
  const { data: dosenData } = useDosen();
  const { data: mahasiswaData } = useMahasiswa();
  const { mutate: updateKelas } = useUpdateKelas();

  const [showAddMK, setShowAddMK] = useState(false);
  const [selectedMK, setSelectedMK] = useState("");
  const [selectedDosen, setSelectedDosen] = useState("");

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (!kelas) return <div className="text-center py-8">Data tidak ditemukan</div>;

  // Get mahasiswa di kelas ini
  const mahasiswaKelas = mahasiswaData?.data?.filter(
    (mhs) => mhs.kelas_id === id
  ) || [];

  // Calculate SKS yang diambil setiap mahasiswa dari KRS yang approved
  const calculateMahasiswaSKS = (mahasiswaId) => {
    // Untuk sementara return total SKS dari matakuliah di kelas
    const matakuliahIds = (kelas.matakuliah_list || []).map(mk => mk.matakuliah_id);
    const totalSKS = mataKuliahData?.data
      ?.filter(mk => matakuliahIds.includes(mk.id))
      ?.reduce((sum, mk) => sum + mk.sks, 0) || 0;
    return totalSKS;
  };

  // Get mata kuliah detail
  const getMataKuliahInfo = (mkId) => {
    return mataKuliahData?.data?.find((mk) => mk.id === mkId);
  };

  // Get dosen detail
  const getDosenInfo = (dosenId) => {
    return dosenData?.data?.find((d) => d.id === dosenId);
  };

  // Calculate total SKS dosen
  const calculateDosenSKS = (dosenId) => {
    const mkList = kelas.matakuliah_list?.filter(mk => mk.dosen_id === dosenId) || [];
    return mkList.reduce((sum, mk) => {
      const mkInfo = getMataKuliahInfo(mk.matakuliah_id);
      return sum + (mkInfo?.sks || 0);
    }, 0);
  };

  const handleAddMataKuliah = () => {
    if (!selectedMK || !selectedDosen) {
      Swal.fire("Peringatan", "Pilih mata kuliah dan dosen", "warning");
      return;
    }

    // Check if MK already exists in class
    const exists = kelas.matakuliah_list?.some(
      (mk) => mk.matakuliah_id === selectedMK
    );
    if (exists) {
      Swal.fire("Peringatan", "Mata kuliah sudah ada di kelas ini", "warning");
      return;
    }

    // Check dosen max SKS
    const dosenInfo = getDosenInfo(selectedDosen);
    const currentDosenSKS = calculateDosenSKS(selectedDosen);
    const mkInfo = getMataKuliahInfo(selectedMK);
    
    if (currentDosenSKS + (mkInfo?.sks || 0) > (dosenInfo?.max_sks || 12)) {
      Swal.fire(
        "Peringatan",
        `Dosen ${dosenInfo?.nama} sudah mencapai batas maksimal SKS (${dosenInfo?.max_sks} SKS)`,
        "warning"
      );
      return;
    }

    const updatedMataKuliahList = [
      ...(kelas.matakuliah_list || []),
      {
        matakuliah_id: selectedMK,
        dosen_id: selectedDosen,
      },
    ];

    updateKelas({
      id: id,
      data: { ...kelas, matakuliah_list: updatedMataKuliahList },
    });

    setSelectedMK("");
    setSelectedDosen("");
    setShowAddMK(false);
  };

  const handleRemoveMataKuliah = (mkId) => {
    Swal.fire({
      title: "Hapus Mata Kuliah?",
      text: "Mata kuliah akan dihapus dari kelas ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedMataKuliahList = kelas.matakuliah_list?.filter(
          (mk) => mk.matakuliah_id !== mkId
        );
        updateKelas({
          id: id,
          data: { ...kelas, matakuliah_list: updatedMataKuliahList },
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Info Kelas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Detail Kelas</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Nama Kelas</p>
            <p className="font-semibold text-lg">{kelas.nama}</p>
          </div>
          <div>
            <p className="text-gray-600">Tahun Ajaran</p>
            <p className="font-semibold text-lg">{kelas.tahun_ajaran}</p>
          </div>
          <div>
            <p className="text-gray-600">Semester</p>
            <p className="font-semibold text-lg">{kelas.semester}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Mahasiswa</p>
            <p className="font-semibold text-lg">{mahasiswaKelas.length} mahasiswa</p>
          </div>
        </div>
      </div>

      {/* Mata Kuliah & Dosen */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Mata Kuliah & Dosen</h3>
          <button
            onClick={() => setShowAddMK(!showAddMK)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {showAddMK ? "Batal" : "+ Tambah Mata Kuliah"}
          </button>
        </div>

        {showAddMK && (
          <div className="mb-4 p-4 bg-gray-50 rounded border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Mata Kuliah
                </label>
                <select
                  value={selectedMK}
                  onChange={(e) => setSelectedMK(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Pilih Mata Kuliah</option>
                  {mataKuliahData?.data?.map((mk) => (
                    <option key={mk.id} value={mk.id}>
                      {mk.nama} ({mk.sks} SKS)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Dosen</label>
                <select
                  value={selectedDosen}
                  onChange={(e) => setSelectedDosen(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Pilih Dosen</option>
                  {dosenData?.data?.map((dosen) => {
                    const currentSKS = calculateDosenSKS(dosen.id);
                    return (
                      <option key={dosen.id} value={dosen.id}>
                        {dosen.nama} ({currentSKS}/{dosen.max_sks} SKS)
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button
              onClick={handleAddMataKuliah}
              className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Simpan
            </button>
          </div>
        )}

        <div className="space-y-2">
          {kelas.matakuliah_list && kelas.matakuliah_list.length > 0 ? (
            kelas.matakuliah_list.map((mk) => {
              const mkInfo = getMataKuliahInfo(mk.matakuliah_id);
              const dosenInfo = getDosenInfo(mk.dosen_id);
              return (
                <div
                  key={mk.matakuliah_id}
                  className="flex justify-between items-center p-4 border rounded hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{mkInfo?.nama}</h4>
                    <p className="text-sm text-gray-600">
                      {mkInfo?.kode} • {mkInfo?.sks} SKS
                    </p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-sm text-gray-600">Dosen Pengampu</p>
                    <p className="font-medium">{dosenInfo?.nama}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveMataKuliah(mk.matakuliah_id)}
                    className="text-red-500 hover:text-red-700 px-3"
                  >
                    🗑️ Hapus
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 py-4">
              Belum ada mata kuliah
            </p>
          )}
        </div>
      </div>

      {/* List Mahasiswa */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Daftar Mahasiswa</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">NIM</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Nama</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">
                  SKS Diambil
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold">
                  Max SKS
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mahasiswaKelas.length > 0 ? (
                mahasiswaKelas.map((mhs) => {
                  const sksDiambil = calculateMahasiswaSKS(mhs.id);
                  const maxSks = mhs.max_sks || 24;
                  const percentage = (sksDiambil / maxSks) * 100;
                  return (
                    <tr key={mhs.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{mhs.nim}</td>
                      <td className="px-4 py-3">{mhs.nama}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-semibold">{sksDiambil} SKS</span>
                      </td>
                      <td className="px-4 py-3 text-center">{maxSks} SKS</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            percentage > 100
                              ? "bg-red-200 text-red-800"
                              : percentage > 80
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {percentage.toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    Tidak ada mahasiswa di kelas ini
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KelasDetail;
