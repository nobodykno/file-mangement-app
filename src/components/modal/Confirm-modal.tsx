import React from 'react'

import './confirmModal.scss'
import Modal from './modal'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  isLoading?: boolean
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  isLoading
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} title={title}>
      <div className='confirm_modal'>
        <p className='confirm_message'>{message}</p>
        <div className='confirm_actions'>
          <button
            className='btn_cancel'
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className='btn_confirm'
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal