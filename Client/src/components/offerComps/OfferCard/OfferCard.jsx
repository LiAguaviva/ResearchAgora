import  { useContext, useEffect, useState } from 'react'
import { useParams } from  'react-router-dom'
import './OfferCard.css'
import { AgoraContext } from '../../../context/ContextProvider';
import { fetchData2, fetchDataValidation } from '../../../helpers/axiosHelper';



export const OfferCard = ({elem, project}) => {

  const [skill, setSkill] = useState([]);
  const {user} = useContext(AgoraContext);
  const project_id = useParams();
  useEffect(() => {
    
    // const fetchJoinRequestFn = async () => {
    //   try {
    //     console.log('befor the await');
        
    //     setSkill(elem.offer_skills?.split(","))    
    //     await fetchJoinRequest();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // fetchJoinRequestFn();
    fetchJoinRequest();
  }, [])

  const deleteOffer = async () => {
    try {
      let result = await fetchData2(`api/offer/deleteoffer/${elem.offer_id}`, 'put')
      
    } catch (error) {
      console.log(error)
    }
  }

  const fetchJoinRequest = async () => {
    try {
      let data = {user_id: user?.user_id,
                  project_id: project?.project_id
      }

      const result = await fetchDataValidation(`http://localhost:4000/api/project/allrequests`, 'post', data);
      console.log('fetchJoinRequest result', result);
      
    } catch (error) {
      console.log(error);
    }
  }


  // ///////////////////////////////////////
  /* const onSubmit = async(e) => {
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
  } */
  // ///////////////////////////////////////
  
  const onSubmit = async (e) => {
    e.preventDefault()
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
  
  // console.log("elem (offer) on offerCARD", elem);
  // console.log("project_id on offerCARD", project_id);
  // console.log('project on OFFER CARD', project);
  
  
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
     {user?.user_id !== project?.creator_user_id && 
    //  user?.user_id !==
          <button 
            onClick={onSubmit}
            className='accept'
          >Apply</button>}

      {user?.user_id === project?.creator_user_id &&
        <button 
          className='cancel'
          onClick={deleteOffer}
      >Delete</button>}
      </div>
    </div>
  )
}
