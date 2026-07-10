import React from 'react';
import './modal.scss';

interface ModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, title, onClose, children }: ModalProps) => {

  if (!isOpen) {return null;}   

  return (
    <div className='modal_overlay' onClick={onClose}>

      {/* Stop click propagating to overlay */}
      <div className='modal_box' onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className='modal_header'>
          <h2>{title}</h2>
          <button className='modal_close' onClick={onClose}>✕</button>
        </div>

        {/* Content */}
        <div className='modal_content'>
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;