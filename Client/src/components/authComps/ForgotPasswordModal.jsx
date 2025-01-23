import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ForgotPasswordModal = () => {
  const navigate = useNavigate()

  // hacer funcion que recargue la página y 
  const closeModal = () => {
    navigate('/login')
  }

  return (
    
    <div className='modalContainer'>
      <div className='verificationModal'>
        <div>
        <h4>Reset Password Link Sent</h4>
        <p>Please, check your email</p>
        </div>
          <button onClick={closeModal}>Accept</button>
      </div>
    </div>

  )
}
