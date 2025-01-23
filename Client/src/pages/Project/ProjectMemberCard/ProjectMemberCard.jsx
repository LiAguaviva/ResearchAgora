import React, { useContext } from 'react'
import avatarDefault from '../../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../../context/ContextProvider'

export const ProjectMemberCard = ({elem}) => {

  const {user} = useContext(AgoraContext)
  console.log('ELEMENTO DE PROJECT CARD ---> ', elem)
  return (
    <div>
      <div className='userCard'>
        <div className='userCardAvatar'>
          <img 
            className='userCardAvatar'
            src={elem?.user_avatar? `http://localhost:4000/images/useravatar/${elem.user_avatar}` : avatarDefault}  
            // src={avatarDefault}
            alt="your avatar" 
          />
        </div>

        <div className='userCardData'>
          <p className='UserCardName'
          > {elem?.user_name}</p>
          <p>{elem?.fields}</p>
        </div>
      </div>  
    </div>
  )
}
