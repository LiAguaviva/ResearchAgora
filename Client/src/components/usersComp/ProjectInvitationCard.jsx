import React from 'react'
import projectDefaultIMG from "../../assets/imgs/lab1.jpg";
import check from '../../assets/icons/check-circle.svg'
import reject from '../../assets/icons/reject-circle.svg'
import { useNavigate } from 'react-router-dom';


export const ProjectInvitationCard = ({elem, updateInvite,index}) => {

  const navigate = useNavigate();

  return (
    <div className='invitationCard'>
    <img
      onClick={() => navigate(`/oneproject/${elem.project_id}`)}
      className="profileProjectImg"
      src={
        elem?.image
          ? `${url}/images/users/${elem.image}`
          : projectDefaultIMG
      }
      alt="project image"
    />

    <div className='data'>
      <div>
      <h4 
        className='projectCardTitle'
        onClick={() => navigate(`/oneproject/${elem.project_id}`)}
      >{elem.project_title}</h4>
      <p className='offerTitle'>{elem.offer_title}</p>
      <p>{elem.sender_name} invited you to Join</p>
      </div>

      <div className='buttons'>
        <img 
          src={check} alt="accept invitation button" 
          onClick={() => updateInvite(elem,1,index)}
        />
        <img 
          src={reject} alt="decline invitation button" 
          onClick={() => updateInvite(elem,2,index)}
        />
      </div>
    </div>
    </div>
  )
}
