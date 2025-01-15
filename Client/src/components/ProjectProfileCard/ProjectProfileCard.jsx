import React, { useContext } from 'react'
import { AgoraContext } from '../../context/ContextProvider'
import projectDefaultIMG from '../../assets/imgs/lab1.jpg'
import './ProjectProfileCard.css'

export const ProjectProfileCard = () => {

  const {user, project} = useContext(AgoraContext)

  return (
    <div className='projectProfileCard'>
       <div className='profileProjectImg'>
          <img 
            className='profileProjectImg'
            src={user?.project? `${url}/images/users/${user.avatar}` :projectDefaultIMG} 
            alt="your avatar" 
          />
        </div>
        <p className='projectName'>project name</p>
    </div>
  )
}
