import React from 'react'
import { ProfileUserCard } from '../../../components/ProfileUserCard/ProfileUserCard'
import { PersonalData } from '../../../components/PersonalData/PersonalData'
import { ProjectProfileCard } from '../../../components/ProjectProfileCard/ProjectProfileCard'

export const Profile = () => {
  
  return (
    <>
    <section>
    <div className='containerPpal'>
      <ProfileUserCard />
    </div>
    <div className='containerPpal'>
      <PersonalData />
    </div>
    </section>

    <section>
      <p>projects.map</p>
      <ProjectProfileCard />
    </section>
    </>
  )
}
