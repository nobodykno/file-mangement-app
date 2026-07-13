import React from 'react';

import './confirm-modal.scss';
import Modal from './modal';

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      <div className='confirm_modal'>
        <p className='confirm_message'>{message}</p>
        <div className='confirm_actions'>
          <button
            className='btn'
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className='btn btn-primary'
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;