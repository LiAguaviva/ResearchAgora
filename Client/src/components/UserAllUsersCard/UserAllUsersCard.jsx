import React, { useContext } from 'react'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider'

export const UserAllUsersCard = () => {

  const {user} = useContext(AgoraContext)

  return (
    <div>
      <div className='userCard'>
        <div className='userCardAvatar'>
          <img 
            className='userCardAvatar'
            // src={user?.user_avatar? `${url}/useravatar/${user.user_avatar}` : avatarDefault}  
            src={avatarDefault}
            alt="your avatar" 
          />
        </div>

        <div className='userCardData'>
          <p className='UserCardName'
          > {user?.user_name} {user?.user_lastname}</p>
          <p>profiency{user?.user_proficiency}</p>
        </div>
      </div>  
    </div>
  )
}
