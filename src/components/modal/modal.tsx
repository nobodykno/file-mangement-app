import React from 'react'
import './modal.scss'

interface ModalProps {
  isOpen: boolean
  title: string
  children: React.ReactNode
}

const Modal = ({ isOpen, title, children }: ModalProps) => {

  if (!isOpen) return null   

  return (
    <div className='modal_overlay' >

      <div className='modal_box'>

        <div className='modal_header'>
          <h2>{title}</h2>
          <button className='modal_close'>✕</button>
        </div>

        
        <div className='modal_content'>
          {children}
        </div>

      </div>
    </div>
  )
}

export default Modal