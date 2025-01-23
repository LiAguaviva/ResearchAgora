import React, { useContext, useState } from 'react'
import projectDefaultIMG from '../../../assets/imgs/lab1.jpg'
// import './AllProjectsCard.css'
import { useNavigate } from 'react-router-dom'
import { AgoraContext } from '../../../context/ContextProvider';

export const ProjectProfileCard = ({elem}) => {

  const navigate = useNavigate();
  const {user, project} = useContext(AgoraContext)
  const [skills, setSkills] = useState(elem.skills?.split(","));
  const [stateClassname, setStateClassname] = useState('');

  // console.log('user en prof proj card', `${user.user_name}${user.user_lastname}`);
  // console.log('creator id en prof proj card', elem);
  

  return (
    <div className='projectCard'>
          <img 
            onClick={() => navigate(`/oneproject/${elem.project_id}`)}
            className='profileProjectImg'
            src={user?.project? `${url}/images/users/${user.avatar}` :projectDefaultIMG} 
            alt="your avatar" 
          />

        <div className='info infoProfile'>
          <h4 className='projectTitle'>{elem.project_title}</h4>
          {`${user.user_name}${user.user_lastname}` === elem.creator_name && 
          <p className='creatorResearcher'>Creator</p> }
          {`${user.user_name}${user.user_lastname}` !== elem.creator_name && 
          <p className='creatorResearcher'>Researcher</p> }
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

          <div className='description'>
            <p>{elem.project_description}</p>
          </div>
        </div>
    </div>
  )
}
