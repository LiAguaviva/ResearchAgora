import { useNavigate } from 'react-router-dom'
import { AgoraContext } from '../../../context/ContextProvider'
import { fetchDataValidation } from '../../../helpers/axiosHelper'
import { ProjectProfileCard } from '../../../components/projectsComp/ProjectProfileCard/ProjectProfileCard'
import StatsRadarChart from '../../../components/usersComp/RadarGraph'
import { ReviewCard } from '../../../components/commonComp/ReviewCard/ReviewCard'
import { WriteReviewCard } from '../../../components/usersComp/WriteReviewCard'
import { ReviewModal } from '../../../components/usersComp/ReviewModal'
import { useContext, useEffect, useState } from "react";
import { ProfileUserCard } from "../../../components/usersComp/ProfileUserCard";
import { UserCard } from "../../../components/usersComp/UserCard";
import axios from "axios";
import './Profile.css'


export const Profile = () => {
  const { user } = useContext(AgoraContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [requests, setrequests] = useState([]);
  const [invites, setInvites] = useState([]);
  const [show,setShow]= useState(false);

  const fetchProjects = async () => {
    try {
      let data = { user_id: user.user_id };
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

  const fetchInvitations = async () => {
    try {
      let data = {user_id: user?.user_id}
      const result = await fetchDataValidation('http://localhost:4000/api/user/allinvites', 'post', data);
      setInvites(result)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchJoinRequest = async () => {
    try {
      let data = { user_id: user?.user_id };

      const result = await fetchDataValidation(
        `http://localhost:4000/api/user/managerequests`,
        "post",
        data
      );
      setrequests(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      fetchProjects();
      fetchJoinRequest();
      fetchInvitations();
    }
  }, [user]);
  console.log('---->',projects)

  const updateRequest = async(elem, value, choose) => {
    try {
      let data = {user_id: elem?.user_id, project_id: elem.project_id, offer_id: elem.offer_id, request_status: value, choose: choose}
      const result = await fetchDataValidation('http://localhost:4000/api/user/updaterequeststatus', 'patch', data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const updateInvite = async(elem,value) => {
    try {
      let data = {invitation_id: elem.invitation_id, invitation_status: value, user_id: elem.receiver_id, project_id: elem.project_id, offer_id: elem.offer_id}
      const result = await fetchDataValidation('http://localhost:4000/api/user/invitationResponse', 'patch', data);
      window.location.reload();
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <>
    <section>
    <div className='containerPpal'>
      <ProfileUserCard />
    </div>

    <div className='containerPpal'>
      <StatsRadarChart />
    </div>
    </section>

    <section>
      <div className='containerPpal ProfileProjects'>
        <h3>Projects</h3>
          <div className='projectsGallery'>
            {projects?.map((elem, index) => {
              return(
                <div key={elem.project_id}>
                  <ProjectProfileCard  elem={elem}/>
                  <div className='separatorProjects' />
                </div>
              )
            })}
          </div>
        </div>

        <button onClick={() => navigate("/createproject")}>
            Create New Project
        </button>
    </section>

    <section>
      <div className="containerPpal ProfileProjects">
        <h3>Requests To Join</h3>
        <div className="projectsGallery">
          {requests?.map((elem) => {
            return (
              <>
                <img
                  src={`http://localhost:4000/images/useravatar/${elem.user_image}`}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />

                <span>{elem.user_name}</span>
                <span>{elem.project_name}</span>
                <span>{elem.offer_title}</span>
                <button onClick={() => updateRequest(elem,1,2)}>✅</button>
                <button onClick={() => updateRequest(elem,2, 1)}>❌</button>
              </>
            );
          })}
        </div>
      </div>
     </section>

      {invites.length && 
     <section>
      <div className="containerPpal ProfileProjects">
        <h3>Invitations</h3>
        <div className="projectsGallery">
          {invites?.map((elem) => {
            return (
              <>
                <img
                  src={`http://localhost:4000/images/useravatar/${elem.user_image}`}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  />

                <span>{elem.sender_name} invited you to Join</span>
                <span>{elem.project_title} in the offer</span>
                <span>{elem.offer_title}</span>
                <button onClick={() => updateInvite(elem,1)}>✅</button>
                <button onClick={() => updateInvite(elem,2)}>❌</button>
              </>
            );
          })}
        </div>
      </div>
     </section>
    }
    


    
    {show && 
     <div>
      <section>
          <div className="containerPpal">
            <button onClick={() => setShow(!show)}>{!show?"Write a review":null}</button>
            <StatsRadarChart />
          </div>
      </section>
    </div>}


     


      {/* <section>
      <div className='containerPpal'>
        <div className='reviewGallery'>
          <ReviewModal show = {show} setShow = {setShow} />
        </div>
      </div>
    </section> */}

    </>
  );
};
