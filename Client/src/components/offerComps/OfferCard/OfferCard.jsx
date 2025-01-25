import  { useContext, useEffect, useState } from 'react'
import { useParams } from  'react-router-dom'
import './OfferCard.css'
import { AgoraContext } from '../../../context/ContextProvider';
import { fetchData2, fetchDataValidation } from '../../../helpers/axiosHelper';



export const OfferCard = ({elem, project, applyButton}) => {

  const [skill, setSkill] = useState([]);
  const {user} = useContext(AgoraContext);
  const project_id = useParams();

  const deleteOffer = async () => {
    try {
      let result = await fetchData2(`api/offer/deleteoffer/${elem.offer_id}`, 'put')
      
    } catch (error) {
      console.log(error)
    }
  }

  const editOffer = async (e) => {
    e.preventDefault();
    
  }

  const onSubmit = async (e) => {
    if (applyButton === 'apply'){
      e.preventDefault()
      changeApplyButton();
      try {
        let data = {offer_id: elem.offer_id,
                    user_id: user?.user_id,
                    project_id: project_id.id
        }
        let joinrequest = await fetchData2(`offer/joinrequest`, 'post', data)
        console.log('joinrequest', joinrequest);
        
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  // console.log("elem (offer) on offerCARD", elem);
  // console.log("project_id on offerCARD", project_id);
  // console.log('project on OFFER CARD', project);
  // console.log('user_id on OfferCard', user?.user_id);
  // console.log('creator_user_id on OfferCard', project[0]?.creator_user_id);
  // console.log('project on OfferCard', project);
  
  
  return (
    <div className='offerCard'>
      <div className='headOffer'>
        <h4>{elem.offer_title}</h4>
        <p className='vacancies'>Available positions: {elem.number_of_position}</p>
      </div>
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
     {user?.user_id !== project[0]?.creator_user_id && 
       applyButton === 'apply' &&
          <button 
            onClick={onSubmit}
            className='accept'
          >Apply</button>}

     {user?.user_id !== project[0]?.creator_user_id && 
       applyButton === 'applied' &&
          <button 
            // onClick={onSubmit}
            className='applied'
          >Applied</button>}

     {user?.user_id !== project[0]?.creator_user_id && 
       applyButton === 'teamMember' &&
          <button 
            // onClick={onSubmit}
            className='disabled'
          >Team Member</button>}

     {user?.user_id !== project[0]?.creator_user_id && 
       applyButton === 'notSelected' &&
          <button 
            // onClick={onSubmit}
            className='disabled'
          >Not selected</button>}

      {user?.user_id === project[0]?.creator_user_id &&
        <button 
          className='accept'
          // onClick={editOffer}
      >edit</button>}

      {user?.user_id === project[0]?.creator_user_id &&
        <button 
          className='cancel'
          // onClick={deleteOffer}
      >Delete</button>}
      </div>
    </div>
  )
}
