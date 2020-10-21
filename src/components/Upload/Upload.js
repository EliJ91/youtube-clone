import React from 'react'
import ReactDom from 'react-dom'
import './Upload.css'
import MyDropzone from './Dropzone/Dropzone'

export default function Upload({ open, onClose, data }) {
  if (!open) return null

  return ReactDom.createPortal(

    <>
    <div onClick={onClose} className="upload__overlayStyles"/>
    <div className="upload__modalStyles">
      <MyDropzone willClose={onClose}/>
    </div>
      
    </>,
    document.getElementById('portal')
  )
}


