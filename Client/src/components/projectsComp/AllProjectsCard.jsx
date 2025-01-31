import React, { useContext, useState } from 'react'
import { AgoraContext } from '../../context/ContextProvider'
import projectDefaultIMG from '../../assets/imgs/lab1.jpg'
import { useNavigate } from 'react-router-dom'

export const AllProjectsCard = ({elem}) => {

  const navigate = useNavigate();
  const {user, project} = useContext(AgoraContext)
  const [skills, setSkills] = useState(elem.skills?.split(","));
  const [stateClassname, setStateClassname] = useState('');

  
  return (
    <div className='projectCard'>
       <div className='profileProjectImg'>
          <img 
            onClick={() => navigate(`/oneproject/${elem.project_id}`)}
            className='profileProjectImg'
            src={user?.project? `${url}/images/users/${user.avatar}` :projectDefaultIMG} 
            alt="default project picture" 
          />
        </div>

        <div className='info infoAllProjects'>
        <h4 
          className='projectCardTitle'
          onClick={() => navigate(`/oneproject/${elem.project_id}`)}
        >{elem.project_title}</h4>
        
          <p className='Creator'>{elem.creator_name}</p>
          <div className='tagsContainer'>
          {skills?.map((skill, index) => (
            <div key={index} className="tag">
              {skill}
            </div>
          ))}
          </div>
          <p className='Status {stateClassname}'>
            {elem.project_status === 1 && <p className='status active'>active</p> }
            {elem.project_status === 2 && <p className='status closed'>completed</p> }
            {elem.project_status === 3 && <p className='status paused'>paused</p> }
          </p>

          {/* <div className='description'>
            <p>{elem.project_description}</p>
          </div> */}
        </div>
    </div>
  )
}
