import React from 'react'


export default function Login({ open, onClose, data }) {
  
  if (!open) return null
  

  return ReactDom.createPortal(
    <>
    
    </>,
    document.getElementById('portal')
  )
}




