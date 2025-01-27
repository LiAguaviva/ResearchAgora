
import React, { useContext } from 'react'
import './PersonalDataCard.css'
import { AgoraContext } from '../../../context/ContextProvider'

export const PersonalDataCard = () => {

    const {user} = useContext(AgoraContext)
  
  return (
    <div className="personalDataCard">
        <h4>Personal data <span className='clarifyMsg'>(only visible for you)</span></h4>
        <div className='data'>
          <p><span className='fieldName'>name:</span> {user?.user_name}</p>
          <p><span className='fieldName'>lastname:</span> {user?.user_lastname}</p>
          <p><span className='fieldName'>Email:</span> {user?.user_email}</p>
          <p><span className='fieldName'>Proficiency:</span> {user?. user_proficiency}</p>
          <p><span className='fieldName'>Current Laboratory:</span> {user?. user_current_lab}</p>
          <p><span className='fieldName'>Current Head:</span> {user?.user_current_boss}</p>
        </div>     
      </div>
  )
}
