import React, { useContext } from 'react'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider'
const urlImg = import.meta.env.VITE_IMAGEPROVIDER_URL;

export const UserCard = () => {

  const {user} = useContext(AgoraContext)

  return (
    <div>
      <div className='userCard'>
          <img 
            className='userCardAvatar'
            // src={user?.user_avatar? `${urlImg}/useravatar/${user.user_avatar}` : avatarDefault}  
            src={avatarDefault}
            alt="profile picture" 
          />

        <div className='userCardData'>
          <p className='UserCardName'
          > {user?.user_name} {user?.user_lastname}</p>
          <p>profiency{user?.user_proficiency}</p>
        </div>
      </div>  
    </div>
  )
}
