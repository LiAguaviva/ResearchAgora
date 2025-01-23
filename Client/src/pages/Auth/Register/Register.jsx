import React from 'react'
import { useState } from 'react'
import { RegisterForm } from '../../../components/authComps/RegisterForm'
import { VerificationModal } from '../../../components/authComps/VerificationModal'

export const Register = () => {

  const [modalShowed, setModalShowed] = useState(true);

  const showModal = ()=> setModalShowed(!modalShowed)

  return (

    <section>
      <div className='containerPpal'>
      <RegisterForm 
        showModal={showModal}
      />
      </div>
      {!modalShowed && <VerificationModal />}
    </section>
  )
}
