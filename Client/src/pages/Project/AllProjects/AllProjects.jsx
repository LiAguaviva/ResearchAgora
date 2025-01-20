import React, { useState } from 'react'

import './AllProjects.css'
import { AllProjectsCard } from '../../../components/ProjectAllProjectsCard/AllProjectsCard';

export const AllProjects = () => {

  const [skills, setSkills] = useState([]);
  const [inputValueSkills, setInputValueSkills] = useState("");

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

  return (
    
    <section className='containerPpal allProjectsPage'>
       <div className='searchingTagContainer'>
        <h2>All Projects</h2>
        <div className="tagsContainerCenter">
          {skills.map((skill, index) => (
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
       <button>Search</button>
      </div>

      <div className='separatorThick' />

      <div className='allProjectsGallery'>
        <AllProjectsCard />
        <div className='separatorAllProjects' />
        <AllProjectsCard />
        <div className='separatorAllProjects' />
        <AllProjectsCard />
        <div className='separatorAllProjects' />
        <AllProjectsCard />
        <div className='separatorAllProjects' />
        <AllProjectsCard />
        <div className='separatorAllProjects' />
        <AllProjectsCard />
        <div className='separatorAllProjects' />
   
      </div>
    </section>
  )
}
