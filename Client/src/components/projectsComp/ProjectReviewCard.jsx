import React, { useContext } from 'react'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider'
import { useNavigate } from 'react-router-dom'


export const ProjectReviewCard = ({elem}) => {
  // console.log("@@@@@@@@@@@@@@", elem);


  const navigate = useNavigate();
  const {user} = useContext(AgoraContext)

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
console.log('elem review', elem);

  return (
    <div>
      <div className='reviewCard'>
        <div className='user'>
              <div className='userCardAvatar'>
                <img 
                  className='userCardAvatar'
                  src={elem?.reviewer_user_avatar ? `http://localhost:4000/images/useravatar/${elem.reviewer_user_avatar}` : avatarDefault}
                  alt="reviewer picture" 
                  onClick={() =>
                    elem?.reviewer_user_id !== user.user_id
                      ? navigate(`/researcher/${elem.reviewer_user_id}`)
                      : navigate("/profile")
                  }
                />
              </div>
      
              <div className='userCardData'>
              <p className='UserCardName'
                onClick={() =>
                elem?.reviewer_user_id !== user.user_id
                  ? navigate(`/researcher/${elem?.reviewer_user_id}`)
                  : navigate("/profile")
              }
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
