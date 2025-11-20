import { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubmit, modulJudul }) => {
  const [pertanyaan, setPertanyaan] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pertanyaan);
    setPertanyaan('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border border-gray-300 rounded p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Tanya Dosen</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        
        <p className="text-gray-600 mb-3">Materi: <span className="font-semibold">{modulJudul}</span></p>
        
        <form onSubmit={handleSubmit}>
          <textarea
            value={pertanyaan}
            onChange={(e) => setPertanyaan(e.target.value)}
            placeholder="Tulis pertanyaan Anda di sini..."
            className="w-full border border-gray-300 rounded p-2 mb-3 min-h-32"
            required
          />
          
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Kirim Pertanyaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
