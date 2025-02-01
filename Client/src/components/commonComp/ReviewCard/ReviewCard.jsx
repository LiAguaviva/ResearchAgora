import React, { useContext } from 'react'
import avatarDefault from '../../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../../context/ContextProvider'
import './ReviewCard.css'
const urlImg = import.meta.env.VITE_IMAGEPROVIDER_URL;


export const ReviewCard = () => {

  const {user} = useContext(AgoraContext)

  return (
    <div>
      <div className='reviewCard'>
        <div className='user'>
              <div className='userCardAvatar'>
                <img 
                  className='userCardAvatar'
                  src={user?.avatar? `${urlImg}/users/${user.avatar}` :avatarDefault} 
                  alt="your default picture" 
                />
              </div>
      
              <div className='userCardData'>
              <p className='UserCardName'
              > {user?.user_name} {user?.user_lastname}</p>
              <p>profiency{user?.user_proficiency}</p>
              </div>
              </div>
              <div className='separatorMid'></div>

              <div className='recomendation'>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate.</p>
              </div>
            </div>  
    </div>
  )
}
