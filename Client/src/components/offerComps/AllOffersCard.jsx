import  { useContext, useEffect, useState } from 'react'
import { AgoraContext } from '../../context/ContextProvider';
import { Link } from 'react-router-dom';



export const AllOffersCard = ({offer}) => {

  const [skills, setSkills] = useState([]);
  const {user} = useContext(AgoraContext)
   
  useEffect(() => {
    setSkills(offer.skills?.split(", "))    
  }, [offer])

  console.log("offer", offer);

  const deleteOffer = () => {
   
  }
  
  return (
    <div className='offerCard'>
      <div className='headOffer'>
      <h4>{offer.offer_title}</h4>
      <p className='vacancies'>Available positions: {offer.number_of_position}</p>
      </div>
      <p>
      {offer.offer_description}
      </p>
      <Link to={`/oneproject/${offer.project_id}`}>About the project</Link>

      <div className='tagsContainer'>
      {skills?.map((el, index)=> {
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
      </div>
    </div>
  )
}
