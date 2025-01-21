import React, { useContext } from 'react'
import './ProjectInfoCard.css'
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;
import projectDefaultIMG from '../../assets/imgs/defaultIMG.png'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider';


export const ProjectInfoCard = ({project}) => {

  const {user} = useContext(AgoraContext)
  console.log(project)
  
  return (
    <section className='projectInfoCard'>
      <h2>{project?.project_title}</h2>
      <div>
        <div className="statusState">
          <p>Status</p>
          <p>{project?.project_status === 1 && 'Active'}</p>
          <p>{project?.project_status === 2 && 'Completed'}</p>
          <p>{project?.project_status === 3 && 'Paused'}</p>
        </div>
        <div className="separatorThick" />
      </div>
      
      <div className="projectData" >
        <img 
          className='projectImg'
          src={project?.project_image? `${url}/projectImage/${project.project_image}` : projectDefaultIMG} 
          alt="your avatar" 
        />

        <div className="data">
          <div className="userCard">
            <div className="userCardAvatar">
              <img 
                className='userCardAvatar'
                src={user?.user_avatar? `${url}/useravatar/${user.user_avatar}` : avatarDefault} 
                alt="your avatar" 
              />
            </div>
    
            <div className="userCardData">
              <p className="UserCardName"
              > {project?.creator_name}</p>
              <p>profiency{user?.user_proficiency}</p>
            </div>
          </div> 
          
          <div className='description'>
            <p>{project?.project_description}</p>
          </div>
        </div>

      </div>
    </section>
  )
}
