import { useState } from 'react';
import toast from 'react-hot-toast';
import Accordion from '../../Components/Accordion';
import Modal from '../../Components/Modal';
import ProgressBar from '../../Components/ProgressBar';

const Kelas = ({ modules, onModuleComplete, progress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModul, setSelectedModul] = useState(null);

  const handleTanyaDosen = (modul) => {
    setSelectedModul(modul);
    setIsModalOpen(true);
  };

  const handleSubmitPertanyaan = (pertanyaan) => {
    toast.success('Pertanyaan berhasil dikirim!');
    setIsModalOpen(false);
    setSelectedModul(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-300 rounded p-6">
        <h2 className="text-xl font-bold mb-2">
          Daftar Modul Pembelajaran
        </h2>
        <p className="text-gray-600 mb-4">
          Klik pada modul untuk melihat detail dan menandai sebagai selesai
        </p>
        
        <div className="mb-4">
          <ProgressBar progress={progress} />
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded p-6">
        <Accordion
          modules={modules}
          onModuleComplete={onModuleComplete}
          onTanyaDosen={handleTanyaDosen}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitPertanyaan}
        modulJudul={selectedModul?.judul}
      />
    </div>
  );
};

export default Kelas;
