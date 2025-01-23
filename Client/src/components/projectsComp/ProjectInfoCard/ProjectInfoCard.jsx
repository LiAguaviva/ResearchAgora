
import React, { useContext, useEffect, useState } from 'react'
import './ProjectInfoCard.css'
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;
import projectDefaultIMG from '../../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { ProjectMainCard } from '../ProjectMainCard';


// add skills on prop and change everithing related to skills

export const ProjectInfoCard = ({project,skills, members}) => {

  // console.log('PROJECT ON projectInfo', project)

  const {user} = useContext(AgoraContext)
  const navigate = useNavigate()
  // const [skills, setSkills] = useState([]);


  // console.log('skills on info card', skills);
  
  // useEffect(() => {
  //   setSkills(project?.project_skills?.split(",") || []);
  // },[project])

  // console.log('SKILSSLSLSLSLSL',skills)
  return (
    <section className='projectInfoCard'>
      <h2>{project?.project_title}</h2>
      <div>
         
        <div className="statusState">

          <div>
            <p className='public'>{project?.project_type === 0 && 'Public'}</p>
            <p className='private'>{project?.project_type === 1 && 'Private'}</p>
          </div>
          
          <div>
            <p className='active'>{project?.project_status === 1 && 'Active'}</p>
            <p className='closed'>{project?.project_status === 2 && 'Completed'}</p>
            <p className='paused'>{project?.project_status === 3 && 'Paused'}</p>
          </div>
        </div>

          

        <div className="separatorThick" />
      </div>
      
      <div className="projectData" >
        <img 
          className='projectImg'
          src={project?.project_image? `
            ${url}/projectImage/${project.project_image}` 
            : projectDefaultIMG} 
          alt="your avatar" 
        />

        <div className="data">
          <div className="userCard">
            <ProjectMainCard  
              project={project} 
              members={members}
            />
          </div> 
          
          <div className='description'>
            <p>{project?.project_description}</p>
            
          </div>
          <div className="tagsContainer">
            {skills.map((skill, index) => (
              <div key={index} className="tag">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
          {user?.user_id === project?.creator_user_id && 
          <button 
            onClick={() => navigate(`/editproject/${project?.project_id}`)}
            className='editButton'
          >EDIT</button>}
    </section>
  )
}
