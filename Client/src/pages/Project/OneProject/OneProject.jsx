import React, { useEffect, useState } from 'react'
import { ProjectInfoCard } from '../../../components/ProjectInfoCard/ProjectInfoCard'
import { OfferCard } from '../../../components/offerCard/offerCard'
import {useParams} from 'react-router-dom'
import { fetchDataValidation } from '../../../helpers/axiosHelper';

export const OneProject = () => {
  const {id} = useParams();
  const [project, setProject] = useState([])

  const fetchOneProject = async() => {
    try {
      const result = await fetchDataValidation(`http://localhost:4000/api/project/oneproject/${id}`, 'get');
      console.log('RESULT FORM BACK ------>', result)
      setProject(result);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOneProject();
  }, [])

  return (
    <div className='oneProjectPage'>
      <section className='containerPpal'>
        <ProjectInfoCard  project={project[0]} />
      </section>
      <div className='separatorThick' />
      <section className='containerPpal'>
        <OfferCard />
      </section>
    </div>
  )
}
