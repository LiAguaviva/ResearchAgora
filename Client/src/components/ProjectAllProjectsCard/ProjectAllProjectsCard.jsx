import React, { useContext } from 'react'
import { AgoraContext } from '../../context/ContextProvider'
import projectDefaultIMG from '../../assets/imgs/lab1.jpg'
import './ProjectAllProjectsCard.css'

export const ProjectAllProjectsCard = () => {

  const {user, project} = useContext(AgoraContext)

  return (
    <div className='ProjectAllProjectsCard'>
       <div className='profileProjectImg'>
          <img 
            className='profileProjectImg'
            src={user?.project? `${url}/images/users/${user.avatar}` :projectDefaultIMG} 
            alt="your avatar" 
          />
        </div>
        <div className='text'>
        <h4 className='projectName'>project name</h4>
        <p className='projectName'>creator</p>
        <p className='projectName'>field</p>
        {/* <p className='projectName'>Estado</p> */}
        <p className='projectName'>Descriptipn</p>
        </div>
    </div>
  )
}
