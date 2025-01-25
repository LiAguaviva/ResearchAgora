import React, { useState } from 'react'
import logo from '../../../assets/logo/Logo_full_PurpleBlue.png'
import './ForgotPassword.css'
import { ForgotPasswordModal } from '../../../components/authComps/ForgotPasswordModal'
import { ForgotPasswordForm } from '../../../components/authComps/ForgotPasswordForm'

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
