import React, { useState } from 'react'
import { LoginForm } from '../../../components/LoginForm/LoginForm'
import { ForgotPasswordForm } from '../../../components/ForgotPasswordForm/ForgotPasswordForm'
import logo from '../../../assets/logo/Logo_full_PurpleBlue.png'
import './ForgotPassword.css'
import { ForgotPasswordModal } from '../../../components/ForgotPasswordModal/ForgotPasswordModal'

export const ForgotPassword = () => {

    const [modalShowed, setModalShowed] = useState(true);
    const showModal = ()=> setModalShowed(!modalShowed)

  return (
    <section className='forgotpasswordPage'>
      <div className='containerPpal'>
      <img src={logo} alt="Research Agora Logo" className='logo'/>
      <ForgotPasswordForm 
      showModal={showModal}
      />
      </div>
      {!modalShowed && <ForgotPasswordModal />}
    </section>
  )
}
