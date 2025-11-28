import { useState } from "react";
import { useKrs, useApproveKrs, useRejectKrs } from "../../Utils/Hooks/useKrs";
import { useMahasiswa } from "../../Utils/Hooks/useMahasiswa";
import { useAuthStateContext } from "../../Utils/Contexts/AuthContext";
import Swal from "sweetalert2";

const KrsAdmin = () => {
  const { user } = useAuthStateContext();
  const [statusFilter, setStatusFilter] = useState("submitted");
  const [selectedKrs, setSelectedKrs] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const { data: krsData } = useKrs({
    status: statusFilter !== "all" ? statusFilter : undefined,
  });
  const { data: mahasiswaData } = useMahasiswa();
  const { mutate: approveKrs } = useApproveKrs();
  const { mutate: rejectKrs } = useRejectKrs();

  const getMahasiswaName = (mahasiswaId) => {
    const mahasiswa = mahasiswaData?.data?.find((m) => m.id === mahasiswaId);
    return mahasiswa?.nama || "Unknown";
  };

  const getMahasiswaNim = (mahasiswaId) => {
    const mahasiswa = mahasiswaData?.data?.find((m) => m.id === mahasiswaId);
    return mahasiswa?.nim || "-";
  };

  const getStatusBadge = (status) => {
    const badges = {
      draft: "bg-gray-200 text-gray-800",
      submitted: "bg-yellow-200 text-yellow-800",
      approved: "bg-green-200 text-green-800",
      rejected: "bg-red-200 text-red-800",
    };
    const labels = {
      draft: "Draft",
      submitted: "Diajukan",
      approved: "Disetujui",
      rejected: "Ditolak",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const handleViewDetail = (krs) => {
    setSelectedKrs(krs);
    setShowDetailModal(true);
  };

  const handleApprove = (krsId) => {
    Swal.fire({
      title: "Setujui KRS?",
      text: "KRS akan disetujui dan tidak dapat diubah",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Setujui!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        approveKrs({ id: krsId, approvedBy: user?.id });
        setShowDetailModal(false);
      }
    });
  };

  const handleReject = (krsId) => {
    Swal.fire({
      title: "Tolak KRS",
      input: "textarea",
      inputLabel: "Alasan Penolakan",
      inputPlaceholder: "Masukkan alasan penolakan...",
      inputAttributes: {
        "aria-label": "Masukkan alasan penolakan",
      },
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Tolak KRS",
      cancelButtonText: "Batal",
      inputValidator: (value) => {
        if (!value) {
          return "Alasan penolakan harus diisi!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        rejectKrs({
          id: krsId,
          rejectedBy: user?.id,
          reason: result.value,
        });
        setShowDetailModal(false);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kelola KRS</h1>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="all">Semua Status</option>
            <option value="submitted">Diajukan</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <p className="text-sm text-yellow-800">Menunggu Persetujuan</p>
          <p className="text-2xl font-bold text-yellow-900">
            {krsData?.data?.filter((k) => k.status === "submitted").length || 0}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <p className="text-sm text-green-800">Disetujui</p>
          <p className="text-2xl font-bold text-green-900">
            {krsData?.data?.filter((k) => k.status === "approved").length || 0}
          </p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <p className="text-sm text-red-800">Ditolak</p>
          <p className="text-2xl font-bold text-red-900">
            {krsData?.data?.filter((k) => k.status === "rejected").length || 0}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-800">Draft</p>
          <p className="text-2xl font-bold text-gray-900">
            {krsData?.data?.filter((k) => k.status === "draft").length || 0}
          </p>
        </div>
      </div>

      {/* KRS Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                NIM
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nama Mahasiswa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Semester
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total SKS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {krsData?.data?.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Tidak ada data KRS
                </td>
              </tr>
            ) : (
              krsData?.data?.map((krs) => (
                <tr key={krs.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">
                    {getMahasiswaNim(krs.mahasiswa_id)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {getMahasiswaName(krs.mahasiswa_id)}
                  </td>
                  <td className="px-6 py-4 text-sm">{krs.semester}</td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {krs.total_sks} SKS
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {getStatusBadge(krs.status)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleViewDetail(krs)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedKrs && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">Detail KRS</h2>
                <p className="text-gray-600">
                  {getMahasiswaName(selectedKrs.mahasiswa_id)} -{" "}
                  {getMahasiswaNim(selectedKrs.mahasiswa_id)}
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Semester</p>
                  <p className="font-semibold">{selectedKrs.semester}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total SKS</p>
                  <p className="font-semibold">{selectedKrs.total_sks} SKS</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedKrs.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tanggal Pengajuan</p>
                  <p className="font-semibold">
                    {selectedKrs.submitted_at
                      ? new Date(selectedKrs.submitted_at).toLocaleDateString(
                          "id-ID"
                        )
                      : "-"}
                  </p>
                </div>
              </div>

              {selectedKrs.rejection_reason && (
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <p className="text-sm font-semibold text-red-800 mb-1">
                    Alasan Penolakan:
                  </p>
                  <p className="text-sm text-red-700">
                    {selectedKrs.rejection_reason}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-3">Mata Kuliah Dipilih</h3>
                <div className="space-y-2">
                  {selectedKrs.matakuliah?.map((mk, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded"
                    >
                      <div>
                        <p className="font-medium">{mk.nama}</p>
                        <p className="text-sm text-gray-600">{mk.kode}</p>
                      </div>
                      <span className="font-semibold">{mk.sks} SKS</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedKrs.status === "submitted" && (
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => handleApprove(selectedKrs.id)}
                    className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                  >
                    ✅ Setujui
                  </button>
                  <button
                    onClick={() => handleReject(selectedKrs.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    ❌ Tolak
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KrsAdmin;
