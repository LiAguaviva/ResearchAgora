import React, { useContext } from 'react'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider'
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;


export const ProjectMainCard = ({project}) => {

  const {user} = useContext(AgoraContext)
  console.log('main', user);
  
  return (
    <div>
      <div className='userCard'>
       <div className="userCardAvatar">
           <img 
             className='userCardAvatar'
             src={user?.user_avatar? `${url}/useravatar/${user.user_avatar}` : avatarDefault} 
             alt="your avatar" 
           />
         </div>
 
         <div className="userCardData">
           <p className="UserCardName"
           > {project?.creator_name}</p>
           <p>Creator</p>
         </div>
      </div>  
    </div>
  )
}
