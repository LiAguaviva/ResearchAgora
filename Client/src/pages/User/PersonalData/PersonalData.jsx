import React, { useContext } from 'react'
import { PersonalDataCard } from '../../../components/PersonalDataCard/PersonalDataCard'
import './PersonalData.css'
import { useNavigate } from 'react-router-dom'
import avatarDefault from '../../../assets/imgs/defaultIMG.png'
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;
import { AgoraContext } from '../../../context/ContextProvider'

export const PersonalData = () => {

  const navigate = useNavigate();
  const { user } = useContext(AgoraContext)
  return (
    <section className='containerPpal personalDataPage'>
      <div className='profileAvatar'>
                <img 
                className='profileAvatar'
                  src={user?.user_avatar? `${url}/useravatar/${user.user_avatar}` : avatarDefault} 
                  alt="your avatar" 
                />
              </div>
      <PersonalDataCard />
      <button onClick={() => navigate('/editProfile')}>Edit</button>
    </section>
  )
}
