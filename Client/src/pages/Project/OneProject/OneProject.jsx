import React, { useEffect, useState } from 'react'
import { ProjectInfoCard } from '../../../components/ProjectInfoCard/ProjectInfoCard'
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
      <div className='containerPpal'>
        <ProjectInfoCard project={project[0]}/>
      </div>

      <section>
        
      </section>
    </div>
  )
}
