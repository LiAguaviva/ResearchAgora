import React from 'react'
import { useNavigate } from 'react-router-dom'
import './GoBack.css'

export const GoBack = () => {
  const navigate = useNavigate()
  return (
    <button 
          onClick={()=>navigate(-1)}
          className="goBack"
        >Go Back</button>
  )
}
