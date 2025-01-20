import React, { useState } from 'react'
import { ProjectAllProjectsCard } from '../../../components/ProjectAllProjectsCard/ProjectAllProjectsCard'

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
    
    <section className='containerPpal'>
       <div>
        <label htmlFor="skills">Skills</label>
        <div className="tagsContainer">
          {skills.map((skill, index) => (
            <div key={index} className="tag">
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
            placeholder="Añade una skill y pulsa Enter"
          />
      </div>
      <button>Search</button>
      
      <ProjectAllProjectsCard />
      <ProjectAllProjectsCard />
      <ProjectAllProjectsCard />
      <ProjectAllProjectsCard />
      <ProjectAllProjectsCard />
      <ProjectAllProjectsCard />
      <ProjectAllProjectsCard />
      <ProjectAllProjectsCard />
      <ProjectAllProjectsCard />
    </section>
  )
}
