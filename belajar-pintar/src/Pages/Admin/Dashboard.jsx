import { useNavigate } from 'react-router-dom';
import ProgressBar from '../../Components/ProgressBar';

const Dashboard = ({ progress, userName }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-300 rounded p-6">
        <h2 className="text-xl font-bold mb-2">
          Selamat Datang, {userName}!
        </h2>
        <p className="text-gray-600 mb-4">
          Mari lanjutkan perjalanan belajar Anda hari ini
        </p>
        
        <div className="mb-4">
          <ProgressBar progress={progress} />
        </div>
        
        <button
          onClick={() => navigate('/admin/kelas')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Lanjutkan Belajar
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-300 rounded p-4">
          <h3 className="text-sm font-semibold mb-2 text-gray-600">Total Modul</h3>
          <p className="text-2xl font-bold">3</p>
        </div>
        
        <div className="bg-white border border-gray-300 rounded p-4">
          <h3 className="text-sm font-semibold mb-2 text-gray-600">Modul Selesai</h3>
          <p className="text-2xl font-bold">{Math.round(progress / 33.33)}</p>
        </div>
        
        <div className="bg-white border border-gray-300 rounded p-4">
          <h3 className="text-sm font-semibold mb-2 text-gray-600">Progress</h3>
          <p className="text-2xl font-bold">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
