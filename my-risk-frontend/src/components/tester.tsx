import React from "react";

interface TesterProps {
  title: string;
  count: number;
  onClick: () => void;
}

const Tester: React.FC<TesterProps> = ({ title, count, onClick }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-4 text-lg text-gray-600">
        Count: <span className="font-bold text-gray-800">{count}</span>
      </p>
      <button
        onClick={onClick}
        className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Click Me
      </button>
    </div>
  );
};

export default Tester;
