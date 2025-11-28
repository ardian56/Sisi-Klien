import { useState, useEffect } from "react";
import { useMataKuliah } from "../../Utils/Hooks/useMataKuliah";
import { useMahasiswa } from "../../Utils/Hooks/useMahasiswa";
import {
  useKrs,
  useStoreKrs,
  useUpdateKrs,
  useSubmitKrs,
} from "../../Utils/Hooks/useKrs";
import { useAuthStateContext } from "../../Utils/Contexts/AuthContext";
import Swal from "sweetalert2";

const KrsMahasiswa = () => {
  const { user } = useAuthStateContext();
  const { data: mataKuliahData } = useMataKuliah();
  const { data: mahasiswaData } = useMahasiswa();
  const { data: krsData } = useKrs({ mahasiswa_id: user?.id });

  const { mutate: storeKrs } = useStoreKrs();
  const { mutate: updateKrs } = useUpdateKrs();
  const { mutate: submitKrs } = useSubmitKrs();

  const [selectedMataKuliah, setSelectedMataKuliah] = useState([]);
  const [currentKrsId, setCurrentKrsId] = useState(null);

  // Load existing draft KRS
  useEffect(() => {
    if (krsData?.data) {
      const draftKrs = krsData.data.find((k) => k.status === "draft");
      if (draftKrs) {
        setSelectedMataKuliah(draftKrs.matakuliah || []);
        setCurrentKrsId(draftKrs.id);
      }
    }
  }, [krsData]);

  const currentMahasiswa = mahasiswaData?.data?.find(
    (m) => m.id === user?.id
  ) || { max_sks: 24 };

  const totalSks = selectedMataKuliah.reduce((sum, mk) => sum + mk.sks, 0);
  const maxSks = currentMahasiswa.max_sks || 24;
  const sksPercentage = (totalSks / maxSks) * 100;

  const handleToggleMataKuliah = (mk) => {
    const isSelected = selectedMataKuliah.find(
      (item) => item.matakuliah_id === mk.id
    );

    if (isSelected) {
      setSelectedMataKuliah(
        selectedMataKuliah.filter((item) => item.matakuliah_id !== mk.id)
      );
    } else {
      if (totalSks + mk.sks > maxSks) {
        Swal.fire({
          icon: "warning",
          title: "SKS Melebihi Batas",
          text: `Total SKS tidak boleh melebihi ${maxSks} SKS`,
        });
        return;
      }
      setSelectedMataKuliah([
        ...selectedMataKuliah,
        {
          matakuliah_id: mk.id,
          kode: mk.kode,
          nama: mk.nama,
          sks: mk.sks,
        },
      ]);
    }
  };

  const handleSaveDraft = () => {
    const krsData = {
      mahasiswa_id: user?.id,
      semester: "2024/2025 Ganjil",
      status: "draft",
      total_sks: totalSks,
      matakuliah: selectedMataKuliah,
    };

    if (currentKrsId) {
      updateKrs({ id: currentKrsId, data: krsData });
    } else {
      storeKrs(krsData);
    }
  };

  const handleSubmitKrs = () => {
    if (selectedMataKuliah.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: "Pilih minimal 1 mata kuliah",
      });
      return;
    }

    Swal.fire({
      title: "Ajukan KRS?",
      text: "KRS yang sudah diajukan tidak dapat diubah",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Ajukan!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        if (currentKrsId) {
          submitKrs(currentKrsId);
        } else {
          const krsData = {
            mahasiswa_id: user?.id,
            semester: "2024/2025 Ganjil",
            status: "submitted",
            total_sks: totalSks,
            matakuliah: selectedMataKuliah,
            submitted_at: new Date().toISOString(),
          };
          storeKrs(krsData);
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kartu Rencana Studi (KRS)</h1>
        <div className="text-right">
          <p className="text-sm text-gray-600">Semester: 2024/2025 Ganjil</p>
          <p className="text-sm text-gray-600">
            Batas SKS: {maxSks} SKS
          </p>
        </div>
      </div>

      {/* SKS Progress Bar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Total SKS Dipilih</span>
          <span className="font-bold text-lg">
            {totalSks} / {maxSks} SKS
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all ${
              sksPercentage > 100
                ? "bg-red-500"
                : sksPercentage > 80
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${Math.min(sksPercentage, 100)}%` }}
          ></div>
        </div>
        {sksPercentage > 100 && (
          <p className="text-red-500 text-sm mt-2">
            ⚠️ Total SKS melebihi batas maksimum!
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daftar Mata Kuliah */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Daftar Mata Kuliah</h2>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {mataKuliahData?.data?.map((mk) => {
              const isSelected = selectedMataKuliah.find(
                (item) => item.matakuliah_id === mk.id
              );
              return (
                <div
                  key={mk.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleToggleMataKuliah(mk)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{mk.nama}</h3>
                      <p className="text-sm text-gray-600">{mk.kode}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {mk.sks} SKS
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          Semester {mk.semester}
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={!!isSelected}
                      onChange={() => {}}
                      className="mt-1 h-5 w-5"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ringkasan KRS */}
        <div className="bg-white rounded-lg shadow h-fit sticky top-4">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Ringkasan KRS</h2>
          </div>
          <div className="p-4 space-y-4">
            {selectedMataKuliah.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Belum ada mata kuliah dipilih
              </p>
            ) : (
              <>
                <div className="space-y-2">
                  {selectedMataKuliah.map((mk) => (
                    <div
                      key={mk.matakuliah_id}
                      className="flex justify-between items-start p-2 bg-gray-50 rounded"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{mk.nama}</p>
                        <p className="text-xs text-gray-600">{mk.kode}</p>
                      </div>
                      <span className="text-sm font-semibold ml-2">
                        {mk.sks} SKS
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{totalSks} SKS</span>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2 pt-4 border-t">
              <button
                onClick={handleSaveDraft}
                disabled={selectedMataKuliah.length === 0}
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                💾 Simpan Draft
              </button>
              <button
                onClick={handleSubmitKrs}
                disabled={
                  selectedMataKuliah.length === 0 || totalSks > maxSks
                }
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                📝 Ajukan KRS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KrsMahasiswa;
