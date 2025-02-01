import React from 'react'
import { useNavigate } from 'react-router-dom'
import './GoBack.css'
import goBack from '../../../assets/icons/arrowBack-circle.svg'

export const GoBack = () => {
  const navigate = useNavigate()
  return (
    <>
      <img className='goBack' 

       onClick={()=>navigate(-1)}
        src={goBack} 
        alt="go back icon" 
      />
    </>
  )
}
