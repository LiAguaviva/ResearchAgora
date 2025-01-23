import { useContext, useEffect, useState } from 'react'
import { ProfileUserCard } from '../../../components/usersComp/ProfileUserCard'
import { UserCard } from '../../../components/usersComp/UserCard'
import axios from 'axios'

import './Profile.css'
import { useNavigate } from 'react-router-dom'
import { AgoraContext } from '../../../context/ContextProvider'
import { fetchDataValidation } from '../../../helpers/axiosHelper'
import { ProjectProfileCard } from '../../../components/projectsComp/ProjectProfileCard/ProjectProfileCard'
import StatsRadarChart from '../../../components/usersComp/RadarGraph'
import { ReviewCard } from '../../../components/commonComp/ReviewCard/ReviewCard'

export const Profile = () => {

  const {user} = useContext(AgoraContext)
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])

  const fetchProjects = async() => {
    try {
      let data = {user_id: user.user_id}
      const result = await fetchDataValidation(`http://localhost:4000/api/project/oneuserprojects`,'post', data);
      setProjects(result)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user?.user_id) {
      fetchProjects();
    }
  },[user])
  
  console.log(user)
  return (
    <>
    <section>
    <div className='containerPpal'>
      <ProfileUserCard />
    </div>

    <div className='containerPpal'>
      <StatsRadarChart />
    </div>
    </section>

    <section>
      <div className='containerPpal ProfileProjects'>
        <h3>Projects</h3>
        <div className='projectsGallery'>
          {projects?.map((elem) => {
            return(
              <>
                <ProjectProfileCard key={elem.project_id} elem={elem}/>
                <div className='separatorProjects' />
              </>
            )
          })}
        </div>
        <button onClick={() => navigate('/createproject')}>Create New Project</button>
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
