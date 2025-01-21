import React, { useContext } from 'react'
import { AgoraContext } from '../../context/ContextProvider'
import projectDefaultIMG from '../../assets/imgs/lab1.jpg'
import './ProjectProfileCard.css'
import { useNavigate } from 'react-router-dom'

export const ProjectProfileCard = ({elem}) => {

  const {user} = useContext(AgoraContext)
  const navigate = useNavigate()
  console.log(elem)
  return (
    <div className='projectProfileCard'>
       <div className='profileProjectImg'>
          <img 
            className='profileProjectImg'
            onClick={() => navigate(`/oneproject/${elem.project_id}`)}
            src={user?.project? `${url}/images/users/${user.avatar}` :projectDefaultIMG} 
            alt="your avatar" 
          />
        </div>
        <div className='text'>
        <h4 className='projectName'>{elem.project_title}</h4>
        <p className='projectName'>{elem.project_status}</p>
        </div>
    </div>
  )
}
