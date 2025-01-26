import { useNavigate, useParams } from 'react-router-dom'
import { AgoraContext } from '../../../context/ContextProvider'
import { fetchData, fetchData2, fetchDataValidation } from '../../../helpers/axiosHelper'
import { ProjectProfileCard } from '../../../components/projectsComp/ProjectProfileCard/ProjectProfileCard'
import StatsRadarChart from '../../../components/usersComp/RadarGraph'
import { ReviewCard } from '../../../components/commonComp/ReviewCard/ReviewCard'
import { WriteReviewCard } from '../../../components/usersComp/WriteReviewCard'
import { ReviewModal } from '../../../components/usersComp/ReviewModal'
import { useContext, useEffect, useState } from "react";
import { ProfileUserCard } from "../../../components/usersComp/ProfileUserCard";
import { UserCard } from "../../../components/usersComp/UserCard";
import axios from "axios";
import './Researcher.css'
import { RequestCard } from '../../../components/usersComp/RequestCard/RequestCard'
import { ProjectInvitationCard } from '../../../components/usersComp/ProjectInvitationCard'
import { ResearcherDataCard } from '../../../components/researcherComp/ResearcherDataCard'


export const Researcher = () => {
  // const { user } = useContext(AgoraContext);
  const {id} = useParams();
  const [researcher, setResearcher] = useState()
  // const [user, setUser] = useState()
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [requests, setrequests] = useState([]);
  const [invites, setInvites] = useState([]);
  const [show,setShow]= useState(false);

  const fetchResearcher = async () => {
    try {
      let data ={ user_id: id}
      console.log('id', id);
      const result = await fetchData(`/getresearcherbyid`, 'post', data);
      setResearcher(result[0]);
    } catch (error) {
      console.log(error);
      
    }
  }

  const fetchProjects = async () => {
    try {
      let data = { user_id: researcher.user_id };
      const result = await fetchDataValidation(
        `http://localhost:4000/api/project/oneuserprojects`,
        "post",
        data
      );
      setProjects(result);
    } catch (error) {
      console.log(error);
    }
  };

  

  const fetchFn = async () => {
    await fetchProjects();
    await fetchResearcher();
  }

  useEffect(() => {
      fetchFn();
  }, []);

  // console.log('---->',projects)


  console.log(researcher);
  

  return (
    <>
    <section>
    <div className='containerPpal'>
      <ResearcherDataCard researcher={researcher} />
    </div>

    <div className='containerPpal'>
      <StatsRadarChart />
    </div>
    </section>

    <section className='containerPpal projectsSection'>
      <div className='projectsGallery'>
        <h3>Projects</h3>
            {projects?.map((elem, index) => {
              return(
                <div key={elem.project_id} className='projectsGallery'
                >
                  <ProjectProfileCard  
                    elem={elem}
                    researcher={researcher}
                  />
                  <div className='separatorProjects' />
                </div>
              )
            })}
        </div>
    </section>
    
      <section>
          <div className="containerPpal">
            <button onClick={() => setShow(!show)}>{!show?"Write a review":null}</button>
            {show && <ReviewModal
               show = {show}
               setShow = {setShow}
               user_id = {user_id} />
            }
          </div>
      </section>

    {/* <section>
      <div className='containerPpal'>
        <div className='reviewGallery'>
          <ReviewModal 
            show = {show} 
            setShow = {setShow} 
          />
        </div>
      </div>
    </section> */}

    </>
  );
};
