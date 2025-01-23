import  { useContext, useEffect, useState } from 'react'
import { AgoraContext } from '../../context/ContextProvider';



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
      <h4>{offer.offer_title}</h4>
      <h4>Title lorem bla bla bla</h4>
      <p className='vacancies'>Available positions: {offer.number_of_position}</p>
      <p>
      {offer.offer_description}
      </p>

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
