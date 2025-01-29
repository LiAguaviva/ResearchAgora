import { useNavigate } from 'react-router-dom'
import { AgoraContext } from '../../../context/ContextProvider'
import { fetchData2, fetchDataValidation } from '../../../helpers/axiosHelper'
import { ProjectProfileCard } from '../../../components/projectsComp/ProjectProfileCard/ProjectProfileCard'
import StatsRadarChart from '../../../components/usersComp/RadarGraph'
import { ReviewCard } from '../../../components/commonComp/ReviewCard/ReviewCard'
import { WriteReviewCard } from '../../../components/usersComp/WriteReviewCard'
import { useContext, useEffect, useState } from "react";
import { ProfileUserCard } from "../../../components/usersComp/ProfileUserCard";
import { UserCard } from "../../../components/usersComp/UserCard";
import axios from "axios";
import './Profile.css'
import { RequestCard } from '../../../components/usersComp/RequestCard/RequestCard'
import { ProjectInvitationCard } from '../../../components/usersComp/ProjectInvitationCard'
import React from 'react'
import trash from '../../../assets/icons/trash.svg'
// imoprt 


export const Profile = () => {
  const { user, token } = useContext(AgoraContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [requests, setrequests] = useState([]);
  const [invites, setInvites] = useState([]);
  const [show,setShow]= useState(false);

  const fetchProjects = async () => {
    try {
      let data = { user_id: user?.user_id };
      const result = await fetchDataValidation(
        `http://localhost:4000/api/project/oneuserprojects`,
        "post",
        data,
        { Authorization: `Bearer ${token}` }
      );
      setProjects(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInvitations = async () => {
    try {
      let data = {user_id: user?.user_id}
      const result = await fetchDataValidation('http://localhost:4000/api/user/allinvites', 'post', data, { Authorization: `Bearer ${token}` });
      setInvites(result)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async () => {
    
    try {
      await fetchData2(`user/deleteUser/${user.user_id}`, "put")
      navigate("/") 
      setUser(null);
      
    } catch (error) {
      console.log("error during deletion", error);
  
    }
        
  }

  // const fetchJoinRequest = async () => {
  //   try {
  //     let data = { user_id: user?.user_id };

  //     const result = await fetchDataValidation(
  //       `http://localhost:4000/api/user/pendingrequeststatus`,
  //       "post",
  //       data
  //     );
  //     setrequests(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (user?.user_id) {
      fetchProjects();
      // fetchJoinRequest();
      fetchInvitations();
    }
  }, [user]);
  
  console.log('---->',projects)

  

  const updateInvite = async(elem,value) => {
    try {
      let data = {invitation_id: elem.invitation_id, invitation_status: value, user_id: elem.receiver_id, project_id: elem.project_id, offer_id: elem.offer_id}
      const result = await fetchDataValidation('http://localhost:4000/api/user/invitationResponse', 'patch', data, { Authorization: `Bearer ${token}` });
      window.location.reload();
    } catch (error) {
      console.log(error);
      
    }
  }

  console.log('Usser projects -->', projects)

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

      <section className='containerPpal projectsSection'>
        <div className='projectsGallery'>
          <h3>Projects</h3>
              {projects?.map((elem, index) => {
                return(
                  <div key={elem.project_id} className='projectsGallery'
                  >
                    <ProjectProfileCard  elem={elem}/>
                    <div className='separatorProjects' />
                  </div>
                )
              })}
          </div>

          <button onClick={() => navigate("/createproject")}>
              Create New Project
          </button>
      </section>

      {/* {requests.length > 0 &&
        <section className="containerPpal requestSection">
          <h3>You have requests to join on your projects!</h3>
          <div className="requestGallery">
            {requests?.map((elem) => {
              return (
                <RequestCard 
                  elem={elem} 
                  updateRequest={updateRequest}
                  key={elem.project_id}
                />
              );
            })}
          </div>
       </section>} */}

      {invites.length > 0 && 
       <section  className="containerPpal invitatiosSection">
          <h3>Invitations</h3>
          <div className="invitationsGallery">
            {invites?.map((elem) => {
              return (
                  <ProjectInvitationCard 
                    elem={elem} 
                    updateInvite={updateInvite}
                    key={elem.project_id}
                  />
              );
            })}
        </div>
       </section>    
      }

      <section className="delteAccountSection containerPpal">
          <img 
            src={trash} alt="" 
            onClick={() => handleDelete()}
            className="deleteAccountIcon"
          />
          <p>Delete Account</p>
        </section>
    </>
  );
};
