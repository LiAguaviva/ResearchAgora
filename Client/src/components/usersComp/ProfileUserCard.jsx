import React, { useContext } from 'react'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
const urlImg = import.meta.env.VITE_IMAGEPROVIDER_URL;
import { useNavigate } from 'react-router-dom';
import { AgoraContext } from '../../context/ContextProvider';
import { TagsCard } from '../commonComp/TagsCard/TagsCard';
import { fetchData2 } from '../../helpers/axiosHelper';

export const ProfileUserCard = () => {
  
  const {user, setUser, token, setToken} = useContext(AgoraContext)
  const navigate = useNavigate();

  const handleDelete = async () => {
    
          try {
            const tokenLocal = localStorage.getItem('agoraToken');

            await fetchData2(`user/deleteUser/${user.user_id}`, "put", null,  { Authorization: `Bearer ${token}` })
            localStorage.removeItem('agoraToken');
            navigate("/") 
           
            setToken(null);
            setUser(null);
            
          } catch (error) {
            console.log(error);
        
          }
        
    }

  return (
    <div className='profileUserCard'>

      <div className='profileUserHeader'>
        <div className='profileAvatar'>
          <img 
            className='profileAvatar'
            src={user?.user_avatar? `${urlImg}/useravatar/${user.user_avatar}` : avatarDefault} 
            alt="your avatar" 
          />
        </div>

        <div className='userCardHeadData'>
          <div className='userName' >
          <h2 className='profileUserName'
          > {user?.user_name} {user?.user_lastname}</h2>
          <button onClick={() => navigate('/editProfile')}>EDIT</button>
          </div>
          <h4>Career</h4>
          <p><span className='bold'>Current Laboratory:</span> {user?.user_current_lab}</p>
          <p><span className='bold'>Current Laboratory Head:</span> {user?.user_current_boss}</p>
          <p><span className='bold'>Proficiency:</span> {user?.user_proficiency}</p> 
          <TagsCard />

         
        </div>
      </div>  

      <div className='separatorThick' />
      {user?.user_description && <>
      <div className='profileDescription'>
        <p>{user?.user_description}</p>
      </div>

      <div className='separatorThick' />
      </>}

    </div>
  )
}

