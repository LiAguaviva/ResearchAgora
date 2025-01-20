import React, { useEffect, useState } from 'react'
import { ProjectAllProjectsCard } from '../../../components/ProjectAllProjectsCard/ProjectAllProjectsCard'
import { fetchDataValidation } from '../../../helpers/axiosHelper';

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
    
    <section className='containerPpal'>
       <div>
        <label htmlFor="skills">Skills</label>
        <div className="tagsContainer">
          {skills?.map((skill, index) => (
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
      <button onClick={onSubmit}>Search</button>
      <span>Search Results: {projects?.length}</span>
      {projects?.map((elem)=> {
        return(
          <ProjectAllProjectsCard key={elem.project_id} elem={elem}/>
        );
      })}
    </section>
  )
}
