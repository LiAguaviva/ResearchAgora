import React, { useContext } from 'react'
import './ProjectInfoCard.css'
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;
import projectDefaultIMG from '../../assets/imgs/defaultIMG.png'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider';
import { ProjectMainCard } from '../ProjectMainCard/ProjectMainCard';


export const ProjectInfoCard = ({project}) => {

  const {user} = useContext(AgoraContext)
  console.log('PROJECT ON projectInfo',project)
  
  return (
    <section className='projectInfoCard'>
      <h2>{project?.project_title}</h2>
      <div>
        <div className="statusState">
          <div>
            <p>{project?.project_type === 0 && 'Public'}</p>
            <p>{project?.project_type === 1 && 'Private'}</p>
          </div>
          
          <div>
            <p>{project?.project_status === 1 && 'Active'}</p>
            <p>{project?.project_status === 2 && 'Completed'}</p>
            <p>{project?.project_status === 3 && 'Paused'}</p>
          </div>
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
            <ProjectMainCard  project={project} />
          </div> 
          
          <div className='description'>
            <p>{project?.project_description}</p>
          </div>
        </div>

      </div>
    </section>
  )
}
