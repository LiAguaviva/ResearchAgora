import React, { useEffect, useState } from 'react'

import { fetchDataValidation } from '../../../helpers/axiosHelper';
// import { AllProjectsCard } from '../../../components/AllProjectsCard/AllProjectsCard';
import { UserAllUsersCard } from '../../../components/usersComp/UserAllUsersCard';

export const AllUsers = () => {

    const [skills, setSkills] = useState([]);
    const [inputValueSkills, setInputValueSkills] = useState("");
    const [users, setusers] = useState([])
    
    const fetchUsers = async() => {
      try {
        const result = await fetchDataValidation('http://localhost:4000/api/user/allUsers', 'get');
        setusers(result)
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      fetchUsers();
      console.log('users', users);
      
    }, [])
    console.log(users)
  
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
        let data = {skills: skills?.join(',')};
        if (!skills.length) {
          fetchUsers()
        } else {
          const result = await fetchDataValidation('http://localhost:4000/api/user/findUsersBySkills', 'post',data);
          console.log('result: ', result)
          setusers(result)
        }
      } catch (error) {
        console.log(error);
      }
    }


  return (
    <section className='containerPpal allProjectsPage'>
           <div className='searchingTagContainer'>
            <h2>All Researchers</h2>
            <div className="tagsContainerCenter">
              {skills?.map((skill, index) => (
                <div key={index} className="tagDeleteable">
                  {skill}
                  <span 
                    onClick={() => removeSkill(index)} 
                    className="deleteBtn"
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
    
          <p className='searchResults'>Search Results: {users?.length}</p>
          </div>
    
          <div className='separatorThick' />
    
          {users?.map((elem)=> {
            return(
              <div className='allusersGallery' key={elem.user_id} >
                <UserAllUsersCard elem={elem}/>
                <div className='separatorAllProjects' />
              </div>
            );
          })}
        </section>
  )
}
