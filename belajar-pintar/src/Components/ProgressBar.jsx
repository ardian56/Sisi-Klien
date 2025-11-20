const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-700">Progress Belajar</span>
        <span className="text-sm text-gray-700">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded h-4">
        <div
          className="bg-blue-500 h-4 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
