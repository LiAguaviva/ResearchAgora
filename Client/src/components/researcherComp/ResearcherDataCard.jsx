import React, { useContext } from 'react'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;
import { useNavigate } from 'react-router-dom';
import { TagsCard } from '../commonComp/TagsCard/TagsCard';
import message from '../../assets/icons/message.svg'
import { ResearcherTagsCard } from './ResearcherTagsCard';


export const ResearcherDataCard = ({researcher}) => {

  const navigate = useNavigate();

  const onMessageClick = () => {
    navigate(`/chat/${researcher.user_id}`)
  }

  return (
    <div className='profileUserCard'>

      <div className='profileUserHeader'>
        <div className='profileAvatar'>
          <img 
          className='profileAvatar'
            src={researcher?.user_avatar? `${url}/useravatar/${researcher.user_avatar}` : avatarDefault} 
            alt="your avatar" 
          />
        </div>

        <div className='userCardHeadData'>
          <div className='userName' >
          <h2 className='profileUserName'
          > {researcher?.user_name} {researcher?.user_lastname}</h2>
          <img 
            src={message} alt="" 
            onClick={onMessageClick}
            className="messageIcon"
          />
          </div>
          <p>Current Laboratory: {researcher?.user_current_lab}</p>
          <p>Current Laboratory Head: {researcher?.user_current_boss}</p>
          <p>Proficiency: {researcher?.user_proficiency}</p> 
          <ResearcherTagsCard researcher={researcher} />
        </div>
      </div>  

      <div className='separatorThick' />
      {researcher?.user_description && <>
      <div className='profileDescription'>
        <p>{researcher?.user_description}</p>
      </div>

      <div className='separatorThick' />
      </>}

    </div>
  )
}

