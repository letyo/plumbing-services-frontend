// src/components/Modal.js
import React from 'react';
import './modal.css'; // Add styles for the modal

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <button onClick={onClose}>Bezárás</button>
      </div>
    </div>
  );
};

export default Modal;