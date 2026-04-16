import React from "react";
import "./Modal.css";

import CloseIcon from "../../assets/CloseVector.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="content" onClick={(e) => e.stopPropagation()}>
        <button className="btn" onClick={onClose} aria-label="Close modal">
          <img src={CloseIcon} alt="close" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
