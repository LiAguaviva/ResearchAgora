import React, { useContext } from 'react'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider'
import { useNavigate } from 'react-router-dom';
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;


export const ProjectMainCard = ({project, members}) => {

  const {user} = useContext(AgoraContext)
  const navigate = useNavigate()
  
  const creator = members?.find(member => member.user_id === project?.creator_user_id);
  console.log('cretorrrrr on projectMainCard', creator);
  
  return (
    <div>
      <div className='userCard'>
           <img 
             className='userCardAvatar'
             src={creator?.user_avatar? `${url}/useravatar/${creator.user_avatar}` : avatarDefault} 
             alt="user card picture" 
             onClick={() =>
              creator.user_id !== user.user_id
                ? navigate(`/researcher/${creator.user_id}`)
                : navigate("/profile")
            }
           />
 
         <div className="userCardData">
           <p className="UserCardName"
             onClick={() =>
              creator.user_id !== user.user_id
                ? navigate(`/researcher/${creator.user_id}`)
                : navigate("/profile")
            }
           > {project?.creator_name}</p>
           <p className='creator'>Creator</p>
         </div>

      </div>  
    </div>
  )
}
