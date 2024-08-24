import React from 'react';
import '../styles/Modal.css';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="mymodal">
      <div className="mymodal-content">
        {children}
        <button className="my-close-btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default Modal;