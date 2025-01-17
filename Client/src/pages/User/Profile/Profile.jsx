import React from 'react'
import { ProfileUserCard } from '../../../components/ProfileUserCard/ProfileUserCard'
import { PersonalData } from '../../../components/PersonalData/PersonalData'
import { ProjectProfileCard } from '../../../components/ProjectProfileCard/ProjectProfileCard'
import { ReviewCard } from '../../../components/ReviewCard/ReviewCard'
import { UserCard } from '../../../components/UserCard/UserCard'
import StatsRadarChart from '../../../components/RadarGraph/RadarGraph'
import { useContext } from 'react'
import { AgoraContext } from '../../../context/ContextProvider'

export const Profile = () => {

  const {user} = useContext(AgoraContext)
  
  
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
      <PersonalData />
    </div>
    </section>

    <section>
      <div className='containerPpal'>
        <div className='projectsGallery'>
          <p>projects.map</p>
          <ProjectProfileCard />
        </div>
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
