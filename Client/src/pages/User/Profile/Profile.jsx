import { useEffect, useState } from 'react'
import { ProfileUserCard } from '../../../components/ProfileUserCard/ProfileUserCard'
import { PersonalDataCard } from '../../../components/PersonalDataCard/PersonalDataCard'
import { ProjectProfileCard } from '../../../components/ProjectProfileCard/ProjectProfileCard'
import { ReviewCard } from '../../../components/ReviewCard/ReviewCard'
import { UserCard } from '../../../components/UserCard/UserCard'
import StatsRadarChart from '../../../components/RadarGraph/RadarGraph'
import { useContext } from 'react'
import { AgoraContext } from '../../../context/ContextProvider'
import axios from 'axios'
<<<<<<< HEAD
import './Profile.css'
import { TagsCard } from '../../../components/TagsCard/TagsCard'
=======
import { useNavigate } from 'react-router-dom'
>>>>>>> 55a0f7f6606e7dc8522fe7a5d9c08ec581f49196

export const Profile = () => {

  const {user} = useContext(AgoraContext)
<<<<<<< HEAD

=======
  const navigate = useNavigate()
  const [fields, setFields] = useState([])
  const [skills, setSkills] = useState([])
>>>>>>> 55a0f7f6606e7dc8522fe7a5d9c08ec581f49196

 
  
  
  return (
    <>
    <section>
    <div className='containerPpal'>
      <ProfileUserCard />
    </div>

    <div className='containerPpal'>
      <StatsRadarChart />
    </div>
    <div className='containerPpal'>
          <TagsCard />
    </div>

    {/* <div className='containerPpal'>
      <PersonalDataCard />
    </div> */}
    </section>

    <section>
      <div className='containerPpal ProfileProjects'>
        <h3>Projects</h3>
        <div className='projectsGallery'>
          <ProjectProfileCard />
        </div>
      </div>
      <button onClick={() => navigate('/createproject')}>Create New Project</button>
    </section>

    <section>
      <div className='containerPpal'>
        <UserCard />
      </div>
    </section>

    <section>
      <div className='containerPpal'>
        <div className='reviewGallery'>
          <ReviewCard />
        </div>
      </div>
    </section>
    </>
  )
}
