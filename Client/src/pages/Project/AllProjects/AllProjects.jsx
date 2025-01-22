import React, { useEffect, useState } from 'react'

import './AllProjects.css'
import { fetchDataValidation } from '../../../helpers/axiosHelper';
import { AllProjectsCard } from '../../../components/AllProjectsCard/AllProjectsCard';

export const AllProjects = () => {

  const [skills, setSkills] = useState([]);
  const [inputValueSkills, setInputValueSkills] = useState("");
  const [projects, setProjects] = useState([])
  
  const fetchProjects = async() => {
    try {
      const result = await fetchDataValidation('http://localhost:4000/api/project/allprojects', 'get');
      setProjects(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProjects();
    console.log('projects', projects);
    
  }, [])
  console.log(projects)

 const handleKeyDownSkill = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        inputValueSkills.trim() !== "" &&
        inputValueSkills.trim().length > 1 &&
        /^[a-zA-Z0-9]+$/.test(inputValueSkills.trim())
      ) {
        setSkills([...skills, inputValueSkills.trim()]);
        setInputValueSkills("");
      }
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      let data = {skills: skills.join(',')};
      if (!skills.length) {
        fetchProjects()
      } else {
        const result = await fetchDataValidation('http://localhost:4000/api/project/findprojectbyskills', 'post',data);
        console.log(result)
        setProjects(result)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    
    <section className='containerPpal allProjectsPage'>
       <div className='searchingTagContainer'>
        <h2>All Projects</h2>
        <div className="tagsContainerCenter">
          {skills?.map((skill, index) => (
            <div key={index} className="tagDeleteable">
              {skill}
              <span 
                onClick={() => removeSkill(index)} 
                className="deleteBtn"
                // value={editUser?.skills ? editUser.skills : ''}
              >
                ×
              </span>
            </div>
          ))}
        </div>
          
          <input 
            type="text"
            value={inputValueSkills}
            onChange={(e) => setInputValueSkills(e.target.value)}
            onKeyDown={handleKeyDownSkill}
            placeholder="Add skills for searching"
          />
       <button onClick={onSubmit}>Search</button>

      <p className='searchResults'>Search Results: {projects?.length}</p>
      </div>

      <div className='separatorThick' />

      {projects?.map((elem)=> {
        return(
          <div className='allProjectsGallery' key={elem.project_id} >
            <AllProjectsCard elem={elem}/>
            <div className='separatorProjects' />
          </div>
        );
      })}

    </section>
  )
}
