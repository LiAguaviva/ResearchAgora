import React from 'react'
import './VerificationModal.css'
import { useNavigate } from 'react-router-dom'

export const VerificationModal = () => {
  const navigate = useNavigate()

  // hacer funcion que recargue la página y 
  const closeModal = () => {
    navigate('/login')
  }

  return (
    
    <div className='modalContainer'>
      <div className='verificationModal'>
        <div>
        <h4>Verify your account</h4>
        <p>Please, check your email</p>
        </div>
          <button onClick={closeModal}>Accept</button>
      </div>
    </div>

  )
}
