import { useKrs } from "../../Utils/Hooks/useKrs";
import { useMahasiswa } from "../../Utils/Hooks/useMahasiswa";
import { useKelas } from "../../Utils/Hooks/useKelas";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const { data: krsData } = useKrs();
  const { data: mahasiswaData } = useMahasiswa();
  const { data: kelasData } = useKelas();

  // Data untuk BarChart - Jumlah Mahasiswa per Kelas (dari data real)
  const mahasiswaPerKelasData = kelasData?.data && mahasiswaData?.data
    ? kelasData.data.map((kelas) => {
        const jumlah = mahasiswaData.data.filter(
          (mhs) => mhs.kelas_id === kelas.id
        ).length;
        return {
          kelas: kelas.nama,
          jumlah: jumlah,
        };
      })
    : [];

  // Data untuk PieChart - Status KRS (dari data real)
  const krsStatusData = krsData?.data
    ? Object.entries(
        krsData.data.reduce((acc, krs) => {
          acc[krs.status] = (acc[krs.status] || 0) + 1;
          return acc;
        }, {})
      ).map(([name, value]) => ({
        name:
          name === "draft"
            ? "Draft"
            : name === "submitted"
            ? "Diajukan"
            : name === "approved"
            ? "Disetujui"
            : "Ditolak",
        value,
      }))
    : [];

  // Data untuk LineChart - Trend Pengajuan KRS per Bulan (dari data real)
  const krsTrendData = krsData?.data
    ? (() => {
        const monthlyData = {};
        krsData.data.forEach((krs) => {
          if (krs.submitted_at) {
            const month = new Date(krs.submitted_at).toLocaleString("id-ID", {
              month: "short",
            });
            monthlyData[month] = (monthlyData[month] || 0) + 1;
          }
        });
        return Object.entries(monthlyData)
          .map(([bulan, pengajuan]) => ({ bulan, pengajuan }))
          .sort((a, b) => {
            const months = ["Sep", "Oct", "Nov", "Dec"];
            return months.indexOf(a.bulan) - months.indexOf(b.bulan);
          });
      })()
    : [];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BarChart - Mahasiswa per Kelas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Mahasiswa per Kelas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mahasiswaPerKelasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="kelas" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="jumlah" fill="#8884d8" name="Jumlah Mahasiswa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PieChart - Status KRS */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Status KRS</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={krsStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {krsStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LineChart - Trend Pengajuan KRS */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            Trend Pengajuan KRS (Semester Ini)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={krsTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pengajuan"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Jumlah Pengajuan"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Mahasiswa</h3>
          <p className="text-3xl font-bold">{mahasiswaData?.total || 0}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">KRS Disetujui</h3>
          <p className="text-3xl font-bold">
            {krsData?.data?.filter((k) => k.status === "approved").length || 0}
          </p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">KRS Diajukan</h3>
          <p className="text-3xl font-bold">
            {krsData?.data?.filter((k) => k.status === "submitted").length || 0}
          </p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">KRS Draft</h3>
          <p className="text-3xl font-bold">
            {krsData?.data?.filter((k) => k.status === "draft").length || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;