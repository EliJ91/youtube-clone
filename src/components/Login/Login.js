import React from 'react'
import ReactDom from 'react-dom'
import './Login.css'
import LoginUi from './LoginUi/LoginUi'

export default function Upload({ open, onClose, data }) {
  if (!open) return null

  return ReactDom.createPortal(

    <>
    <div onClick={onClose} className="upload__overlayStyles"/>
    <div className="upload__modalStyles">
      <LoginUi test={onClose} />
    </div>
      
    </>,
    document.getElementById('portal')
  )
}


