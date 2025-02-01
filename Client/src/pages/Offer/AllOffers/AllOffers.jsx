import React, { useEffect, useState } from 'react'
import './alloffers.css'
import { AllOffersCard } from '../../../components/offerComps/AllOffersCard'
import { fetchData2 } from '../../../helpers/axiosHelper';

export const AllOffers = () => {

  const [skills, setSkills] = useState([]);
  const [inputValueSkills, setInputValueSkills] = useState("");
  const [offers, setOffers] = useState([])
  const [seeButton, setSeeButton] = useState(false)
  

  const fetchOffers = async() => {
      try {
        const result = await fetchData2(`offer/alloffers`, 'get');
        setOffers(result)
      } catch (error) {
        console.log(error)
      }
    }
  
  useEffect(() => {
    const fetchoffers = async() => {

      if (skills.length === 0){
        fetchOffers()
      }
    }
    fetchoffers();
    const interval = setInterval(() => {
      fetchoffers();
    }, 1000);
    return () => clearInterval(interval);
      }, [skills])

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

  const clear = () => {
    setSkills([]);
    setSeeButton(false)
  }

  const onSubmit = async(e) => {
      e.preventDefault();
      setSeeButton(true)
      try {
        let data = {skills: skills.join(',')};
        if (!skills.length) {
          fetchOffers()
        } else {
          const result = await fetchData2(`offer/findofferbyskill`, 'post', data);
          setOffers(result)
        }
      } catch (error) {
        console.log(error);
      }
    }

    

  return (
      <div className='alloffersPage'>
        <section className='containerPpal '>
        <h2>Collaboration Bulletin Board</h2>
        <div className='searchingTagContainer'>
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
            placeholder= "Search by skills / key words"
            />

        <div className="buttons">
        {seeButton && <button onClick={clear}>Clear</button>}
        <button onClick={onSubmit}>Search</button>
        </div>

          <p className='searchResults'>Search Results: {offers?.length}</p>
          </div>
        </section>
        
        <section className='containerPpal offersSection'>
        <div className='offerGallery'>
          {offers?.map((offer, key) => {
            return(
              <AllOffersCard offer={offer} key={key}/>
            )
          })}
        </div>
        </section>
      </div>
  )
}
