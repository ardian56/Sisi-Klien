import { useState } from 'react';

const AccordionItem = ({ modul, isOpen, onToggle, onSelesai, onTanyaDosen }) => {
  return (
    <div className="border border-gray-300 rounded mb-2">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${modul.selesai ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
            {modul.selesai && '✓'}
          </span>
          <span className="font-semibold">{modul.judul}</span>
        </div>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-300">
          <p className="text-gray-600 mb-3">{modul.deskripsi}</p>
          <div className="flex gap-2">
            {!modul.selesai && (
              <button
                onClick={onSelesai}
                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Tandai Selesai
              </button>
            )}
            <button
              onClick={onTanyaDosen}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Tanya Dosen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Accordion = ({ modules, onModuleComplete, onTanyaDosen }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {modules.map((modul, index) => (
        <AccordionItem
          key={modul.id}
          modul={modul}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          onSelesai={() => onModuleComplete(index)}
          onTanyaDosen={() => onTanyaDosen(modul)}
        />
      ))}
    </div>
  );
};

export default Accordion;
