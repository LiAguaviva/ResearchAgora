import React from 'react'
import { useNavigate } from 'react-router-dom'
import './GoBack.css'
import goBack from '../../../assets/icons/arrowBack.svg'

export const GoBack = () => {
  const navigate = useNavigate()
  return (
    <>
    {/* <button 
          onClick={()=>navigate(-1)}
          className="goBack"
        >Go Back</button> */}
    {/* <div className='icon'> */}
      <img className='goBack' 
       onClick={()=>navigate(-1)}
        src={goBack} alt="" 
      />
      {/* </div> */}
    </>
  )
}
