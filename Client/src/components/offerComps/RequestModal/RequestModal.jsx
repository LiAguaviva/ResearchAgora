import { useContext, useEffect, useState } from 'react'
import './RequestModal.css'
import { useNavigate } from 'react-router-dom'
import { AgoraContext } from '../../../context/ContextProvider';
import { fetchDataValidation } from '../../../helpers/axiosHelper';

export const RequestModal = ({ showRequestModal, selectedUserId }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const navigate = useNavigate();
  const { user, token } = useContext(AgoraContext);
  const [msg, setmessage] = useState('');

  const handleProjectChange = async (event) => {
    const projectId = event.target.value;
    setSelectedProject(projectId);
    setSelectedOffer(null); // Reiniciar oferta seleccionada al cambiar de proyecto

    try {
      const response = await fetchDataValidation(`http://localhost:4000/api/offer/offersbyproject/${projectId}`, 'get');
      setOffers(response);
    } catch (error) {
      console.log('Error fetching offers:', error);
    }
  };

  const handleOfferChange = (event) => {
    setSelectedOffer(event.target.value);
  };

  const fetchProjects = async () => {
    try {
      let data = {
        user_id: user?.user_id,
        inviter_id: selectedUserId
      };
      const result = await fetchDataValidation(`http://localhost:4000/api/project/oneuserprojects`, 'post', data,  { Authorization: `Bearer ${token}` });
      setProjects(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      fetchProjects();
    }
  }, [user]);

  const sendinvite = async () => {
    if (!selectedProject) {
      setmessage('Select Project')
      return;
    }

    if (!selectedOffer) {
      setmessage('Select Offer')
      return ;
    }

    const project = projects.find((p) => p.project_id == selectedProject);
    const offer = offers.find((o) => o.offer_id == selectedOffer);

    let data = {
      sender_id: user?.user_id,
      receiver_id: selectedUserId,
      project_id: selectedProject,
      offer_id: selectedOffer,
      project_title: project?.project_title || '',
      offer_title: offer?.offer_title || ''
    };
    console.log(data);
    

    try {
      await fetchDataValidation(`http://localhost:4000/api/user/invite`, 
      'put',
       data,
       { headers: { Authorization: `Bearer ${token}` }
    });
      window.location.reload();
    } catch (error) {
      console.log('Error sending invite:', error);
    }
  };

  return (
    <div className="modalContainer">
      <form className="formApp requestModal">
        <fieldset>
          <label htmlFor="project">Project</label>
          <select className="selectModal" onChange={handleProjectChange} value={selectedProject || ''}>
            <option value="">Select a project</option>
            {projects?.map((project) => (
              <option key={project?.project_id} value={project?.project_id}>
                {project.project_title}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="offer">Offer</label>
          <select className="selectModal" onChange={handleOfferChange} value={selectedOffer || ''}>
            <option value="">Select an offer</option>
            {offers?.map((offer) => (
              <option key={offer?.offer_id} value={offer?.offer_id}>
                {offer.offer_title}
              </option>
            ))}
          </select>
        </fieldset>
        {msg && <p className='errorMsg'>{msg}</p>}
        <div className="buttons">
          <button type="button" className="accept" onClick={sendinvite}>
            Send
          </button>
          <button type="button" className="cancel" onClick={() => showRequestModal()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
