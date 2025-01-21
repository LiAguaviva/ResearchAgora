import React, { useContext, useEffect, useState } from 'react'
import './ProjectInfoCard.css'
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;
import projectDefaultIMG from '../../assets/imgs/defaultIMG.png'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';


export const ProjectInfoCard = ({project}) => {

  const {user} = useContext(AgoraContext)
  const navigate = useNavigate()
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    setSkills(project?.project_skills?.split(",") || []);
  },[project])

  
  return (
    <section className='projectInfoCard'>
      <h2>{project?.project_title}</h2>
      <div>
        <div className="statusState">
          {user?.user_id === project?.creator_user_id && <button onClick={() => navigate(`/editproject/${project?.project_id}`)}>EDIT</button>}
          <p>Status</p>
          <p>{project?.project_status === 1 && 'Active'}</p>
          <p>{project?.project_status === 2 && 'Completed'}</p>
          <p>{project?.project_status === 3 && 'Paused'}</p>
        </div>

        <fieldset className="textareaLit">
          <label htmlFor="skills">Skills</label>
          <div className="tagsContainer">
            {skills.map((skill, index) => (
              <div key={index} className="tagDeleteable">
                {skill}
              </div>
            ))}
          </div>
        </fieldset>

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
              <p>Creator</p>
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
