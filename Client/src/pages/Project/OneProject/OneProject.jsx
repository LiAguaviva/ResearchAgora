import React from 'react'
import { ProjectInfoCard } from '../../../components/ProjectInfoCard/ProjectInfoCard'
import { OfferCard } from '../../../components/offerCard/offerCard'

export const OneProject = () => {
  return (
    <div className='oneProjectPage'>
      <section className='containerPpal'>
        <ProjectInfoCard />
      </section>
      <div className='separatorThick' />
      <section className='containerPpal'>
        <OfferCard />
      </section>
    </div>
  )
}
