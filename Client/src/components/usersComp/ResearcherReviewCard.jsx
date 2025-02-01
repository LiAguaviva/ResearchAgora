import React, { useContext } from 'react'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
const urlImg = import.meta.env.VITE_IMAGEPROVIDER_URL;


export const ResearcherReviewCard = ({elem}) => {

  const navigate = useNavigate();
  const {user} = useContext(AgoraContext)

  const renderStars = (rate) => {
    const validRate = Math.max(0, Math.min(5, Math.floor(rate)));
    const emptyStars = 5 - validRate;  
  
    return (
      <>
        {Array.from({ length: validRate }, (_, index) => (
          <span key={`full-${index}`} style={{ color: "#FFD700", fontSize: "20px" }}>★</span>
        ))}
        {Array.from({ length: emptyStars }, (_, index) => (
          <span key={`empty-${index}`} style={{ color: "#D3D3D3", fontSize: "20px" }}>☆</span>
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
              src={elem?.img ? `${urlImg}/useravatar/${elem.img}` : avatarDefault}
              alt="reviewer picture" 
              onClick={() =>
                elem.reviewer_user_id !== user.user_id
                  ? navigate(`/researcher/${elem.reviewer_user_id}`)
                  : navigate("/profile")
              }
            />
          </div>
  
          <div className='userCardData'>
              <p className='UserCardName'
              onClick={() =>
                elem.reviewer_user_id !== user.user_id
                  ? navigate(`/researcher/${elem.reviewer_user_id}`)
                  : navigate("/profile")
              }
              > {elem?.reviewer_name} {elem?.reviewer_lastname}</p>
              <p>{renderStars(elem?.review_rate)}</p>
          </div>
        </div>
              <div className='separatorMid' />

              <div className='recomendation'>
                <p>{elem?.review_content}</p>
              </div>
            </div>  
    </div>
  )
}
