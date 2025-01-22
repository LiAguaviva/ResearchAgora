import  { useEffect, useState } from 'react'
import './OfferCard.css'



export const OfferCard = ({elem}) => {
  const [skill, setSkill] = useState([]);
  
   
  useEffect(() => {
    setSkill(elem.offer_skills.split(","))
   
    return () => {
    
    }
  }, [elem])
  console.log("skillll", skill);
  
  return (
    <div className='offerCard'>
      <h4>{elem.offer_title}</h4>
      <p className='vacancies'>Available positions: {elem.number_of_position}</p>
      <p>
      {elem.offer_description}
      </p>
      {skill?.map((el, index)=> {
        return (
          <div className='tag' key={index}>
             {el}
          </div>
        )
      }
      )}
     
      <button>Apply</button>
    </div>
  )
}
