import { useEffect, useState } from 'react'
import { ProfileUserCard } from '../../../components/ProfileUserCard/ProfileUserCard'
import { PersonalDataCard } from '../../../components/PersonalDataCard/PersonalDataCard'
import { ProjectProfileCard } from '../../../components/ProjectProfileCard/ProjectProfileCard'
import { ReviewCard } from '../../../components/ReviewCard/ReviewCard'
import { UserCard } from '../../../components/UserCard/UserCard'
import StatsRadarChart from '../../../components/RadarGraph/RadarGraph'
import axios from 'axios'

import './Profile.css'
import { TagsCard } from '../../../components/TagsCard/TagsCard'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {


  const navigate = useNavigate()

 
  
  
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
        <button onClick={() => navigate('/createproject')}>Create New Project</button>
      </div>
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
