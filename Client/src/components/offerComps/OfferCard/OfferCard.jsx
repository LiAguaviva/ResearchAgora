import  { useContext, useEffect, useState } from 'react'
import './OfferCard.css'
import { AgoraContext } from '../../../context/ContextProvider';



export const OfferCard = ({elem, project}) => {

  const [skill, setSkill] = useState([]);
  const {user} = useContext(AgoraContext)
   
  useEffect(() => {
    setSkill(elem.offer_skills?.split(","))    
  }, [elem])
  console.log("elem", elem);

  const deleteOffer = () => {
   
  }
  
  return (
    <div className='offerCard'>
      <h4>{elem.offer_title}</h4>
      <p className='vacancies'>Available positions: {elem.number_of_position}</p>
      <p>
      {elem.offer_description}
      </p>

      <div className='tagsContainer'>
      {skill?.map((el, index)=> {
        return (
          <div className='tag' key={index}>
             {el}
          </div>
        )
      }
      )}
     </div>

     <div className='buttons'>
      <button className='accept'>Apply</button>
      {/* <button 
        className='cancel'
        onClick={deleteOffer}
      >Delete</button> */}

      {user?.user_id === project?.creator_user_id && 
          <button 
            onClick={deleteOffer}
            className='cancel'
          >Delete</button>}
      </div>
    </div>
  )
}
