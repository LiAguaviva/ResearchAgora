import React from 'react'
import { RegisterForm } from '../../../components/RegisterForm/RegisterForm'
import SkillsInput from '../../../components/SkillsInputs/SkillsInput'
import { VerificationModal } from '../../../components/VerificationModal/VerificationModal'
import { useState } from 'react'
import './Register.css'

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
