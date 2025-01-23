import  { useContext, useEffect, useState } from 'react'
import './RequestModal.css'
import { useNavigate } from 'react-router-dom'
import { AgoraContext } from '../../../context/ContextProvider';
import { fetchDataValidation } from '../../../helpers/axiosHelper';



export const RequestModal = ({showRequestModal}) => {

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const {user} = useContext(AgoraContext)
  const [selectedProject, setSelectedProject] = useState(null);
  const [offers, setOffers] = useState([]);

  const handleProjectChange = async (event) => {
    const projectId = event.target.value;
    setSelectedProject(projectId);

    // console.log('project on reques HANDLECHANGE', projectId);
    

    try {
      const response = await fetchDataValidation(`http://localhost:4000/api/offer/offersbyproject/${projectId}`, 'get');

      // console.log('response on fetchDataValidation', response);
      setOffers(response);
      
    } catch (error) {
      // console.error('Error fetching offers:', error);
    }
  };
  
  // const closeModal = () => {
    // showRequestModal()
    // navigate('/allusers');
  // }

  const fetchProjects = async() => {
    try {
      let data = {user_id: user?.user_id}
      const result = await fetchDataValidation(`http://localhost:4000/api/project/oneuserprojects`,'post', data);
      setProjects(result)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user?.user_id) {
      fetchProjects();
    }
  },[user])

  // console.log('projects on REQUESTMODAL', projects);
  // console.log('offers on REQUESTMODAL', offers);
  
  
  return (
    <div className='modalContainer'>
    <form className='formApp requestModal'>
    <fieldset>
        <label htmlFor="project">Project</label>
        <select className='selectModal' onChange={handleProjectChange}>
            <option value="">Select a project</option>
            {projects?.map((project) => (
              <option key={project?.project_id} value={project?.project_id}>
                {project.project_title}
              </option>
            ))}
          </select>
      </fieldset>
    <fieldset>
        <label htmlFor="project">Offer</label>
        <select className='selectModal'>
            <option value="">Select an offer</option>
            {offers?.map((offer) => (
              <option key={offer?.offer_id} value={offer?.offer_id}>
                {offer.offer_title}
              </option>
            ))}
          </select>
      </fieldset>

     <div className='buttons'>
      <button className='accept'>Send</button>
      <button className='cancel' onClick={()=>showRequestModal()}>Cancel</button>
      </div>
    </form>
    </div>
  )
}
