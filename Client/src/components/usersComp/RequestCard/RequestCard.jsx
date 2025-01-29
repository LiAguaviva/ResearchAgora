import React from 'react'
import './RequestCard.css'
import { useNavigate } from 'react-router-dom';
import check from '../../../assets/icons/check-circle.svg'
import reject from '../../../assets/icons/reject-circle.svg'

export const RequestCard = ({elem, updateRequest}) => {

  const navigate = useNavigate()
  

  return (
    <div className='requestCard'>
      <img
        className='userCardAvatar'
        src={`http://localhost:4000/images/useravatar/${elem.user_image}`}
        alt="user profile picture"
      />
      <div className='data'>
        <div>
        <h4
          className='projectCardTitle'
          onClick={() => navigate(`/oneproject/${elem.project_id}`)}
        >{elem.project_name}</h4>
        <p className='offerTitle'>{elem.offer_title}</p>
        <p>{elem.user_name}</p>
        {/* <p>{elem.project_name}</p> */}
        </div>

        <div className='buttons'>
          <img 
            src={check} alt="accept request button" 
            onClick={() => updateRequest(elem,1,2)}
          />
          <img 
            src={reject} alt="reject request button" 
            onClick={() => updateRequest(elem,2,1)}
          />
        </div>
      </div>
    </div>
  )
}
