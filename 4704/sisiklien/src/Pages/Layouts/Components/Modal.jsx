// src/Pages/Layouts/Components/Modal.jsx

import React from "react";
import Button from "./Button";
import Heading from "./Heading";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <Heading as="h3" className="mb-0">{title}</Heading>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-2xl">&times;</button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;