import React, { useContext, useState } from 'react'
import { AgoraContext } from '../../context/ContextProvider'
import projectDefaultIMG from '../../assets/imgs/lab1.jpg'
import './ProjectAllProjectsCard.css'

export const ProjectAllProjectsCard = ({elem}) => {

  const {user, project} = useContext(AgoraContext)
  const [skills, setSkills] = useState(elem.skills?.split(","));
  
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
        <h4 className='projectName'>{elem.project_title} {elem.project_status === 1 ? '🟢' : '🔴'}</h4>
        <p className='projectName'>{elem.creator_name}</p>
        <div className="tagsContainer">
          {skills?.map((skill, index) => (
            <div key={index} className="tag">
              {skill}
            </div>
          ))}
        </div>
        {/* <p className='projectName'>Estado</p> */}
        <p className='projectName'>{elem.project_description}</p>
        </div>
    </div>
  )
}
