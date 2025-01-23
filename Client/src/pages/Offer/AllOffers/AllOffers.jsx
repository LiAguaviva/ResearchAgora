import React, { useEffect, useState } from 'react'
import './alloffers.css'
import { AllOffersCard } from '../../../components/offerComps/AllOffersCard'
import { fetchDataValidation } from '../../../helpers/axiosHelper';

export const AllOffers = () => {

  const [skills, setSkills] = useState([]);
  const [inputValueSkills, setInputValueSkills] = useState("");
  const [offers, setOffers] = useState([])

  const fetchOffers = async() => {
      try {
        const result = await fetchDataValidation('http://localhost:4000/api/offer/alloffers', 'get');
        setOffers(result)
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      fetchOffers();
      // console.log('offers on useEffect AllOffers', offers);
      
    }, [])

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
          fetchOffers()
        } else {
          const result = await fetchDataValidation('http://localhost:4000/api/offer/alloffers', 'post', data);
          console.log(result)
          setOffers(result)
        }
      } catch (error) {
        console.log(error);
      }
    }

    console.log('offers on ALLOFFERS', offers);
    

  return (
      <div className='alloffersPage'>
        <section className='containerPpal'>
        <h2>Collaboration Bulletin Board</h2>
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

        <p className='searchResults'>Search Results: {offers?.length}</p>
        </section>

        <div className='offerGallery'>
          {offers?.map((offer) => {
            return(
              <AllOffersCard offer={offer} />
            )
          })}
        </div>
      </div>
  )
}
