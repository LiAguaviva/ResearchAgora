import React, { useContext } from 'react'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider'


export const ProjectReviewCard = ({elem}) => {

   console.log("elemmmmmmmmm****************",elem);

  const renderStars = (rate) => {
    const emptyStars = 5 - rate;  
    return (
      <>
        {Array(rate).fill('★').map((star, index) => (
          <span key={`full-${index}`} style={{ color: '#FFD700', fontSize: '20px' }}>{star}</span>
        ))}
        {Array(emptyStars).fill('☆').map((star, index) => (
          <span key={`empty-${index}`} style={{ color: '#D3D3D3', fontSize: '20px' }}>{star}</span>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className='reviewCard'>
        <div className='user'>
              <div className='userCardAvatar'>
                <img 
                  className='userCardAvatar'
                  // src={user?.avatar? `${url}/images/users/${user.avatar}` :avatarDefault} 
                  src={avatarDefault}
                  alt="your avatar" 
                />
              </div>
      
              <div className='userCardData'>
              <p className='UserCardName'
              > {elem?.reviewer_user_name} {elem?.reviewer_user_lastname}</p>
              <p>{renderStars(elem?.review_rate)}</p>
              </div>
              </div>
              <div className='separatorMid'></div>

              <div className='recomendation'>
                <p>{elem?.review_content}</p>
              </div>
            </div>  
    </div>
  )
}
