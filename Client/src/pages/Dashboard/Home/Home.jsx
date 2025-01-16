import React from 'react'
import { RegisterForm } from '../../../components/RegisterForm/RegisterForm'

export const Home = () => {
  return (
    <>
    <div>
      <h1 style={{fontWeight: "bold", fontStyle: "italic" }} >Hola este es el home</h1>
    </div>
    <div className='containerPpal'>
      <RegisterForm />
    </div>
    </>
  )
}
