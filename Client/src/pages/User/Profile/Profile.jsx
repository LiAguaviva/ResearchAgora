import { useNavigate } from 'react-router-dom'
import { AgoraContext } from '../../../context/ContextProvider'
import { fetchData, fetchData2 } from '../../../helpers/axiosHelper'
import { ProjectProfileCard } from '../../../components/projectsComp/ProjectProfileCard/ProjectProfileCard'
import StatsRadarChart from '../../../components/usersComp/RadarGraph'
import { ReviewCard } from '../../../components/commonComp/ReviewCard/ReviewCard'
import { WriteReviewCard } from '../../../components/usersComp/WriteReviewCard'
import { useContext, useEffect, useState } from "react";
import { ProfileUserCard } from "../../../components/usersComp/ProfileUserCard";
import { UserCard } from "../../../components/usersComp/UserCard";
import './Profile.css'
import { RequestCard } from '../../../components/usersComp/RequestCard/RequestCard'
import { ProjectInvitationCard } from '../../../components/usersComp/ProjectInvitationCard'
import React from 'react'
import trash from '../../../assets/icons/trash.svg'
import { ResearcherReviewCard } from '../../../components/usersComp/ResearcherReviewCard'


export const Profile = () => {
  const { user, token } = useContext(AgoraContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [requests, setrequests] = useState([]);
  const [invites, setInvites] = useState([]);
  const [show,setShow]= useState(false);
  const [review, setReview] = useState([]);


  const fetchProjects = async () => {
    try {
      let data = { user_id: user?.user_id };
      const result = await fetchData2(
        `project/oneuserprojects`,
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
      const result = await fetchData2(`user/allinvites`, 'post', data, { Authorization: `Bearer ${token}` });
      setInvites(result)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchResearcher = async () => {
      try {
        let data ={ user_id: user.user_id}
        const result = await fetchData(`/getresearcherbyid`, 'post', data);
        setReview(result.review)
        
        
      } catch (error) {
        console.log(error);
        
      }
    }

  const handleDelete = async () => {
    
    try {
      await fetchData2(`user/deleteUser/${user.user_id}`, "put", null, { Authorization: `Bearer ${token}` })
      navigate("/") 
      setUser(null);
      
    } catch (error) {
      console.log("error during deletion", error);
  
    }
        
  }

  useEffect(() => {
    if (user?.user_id) {
      fetchProjects();
      fetchInvitations();
      fetchResearcher();
    }
  }, [user]);
  

  

  const updateInvite = async(elem,value,index) => {    
    try {
      let data = {invitation_id: elem.invitation_id, invitation_status: value, user_id: elem.receiver_id, project_id: elem.project_id, offer_id: elem.offer_id}

      const result = await fetchData2('user/invitationResponse', 'patch', data, { Authorization: `Bearer ${token}` });
      const projectID = invites[index].project_id;
      
      const updatedInvites = invites.filter((_, i) => i !== index);
      setInvites(updatedInvites);;
      if(value == 1){
        navigate(`/oneproject/${projectID}`)
      }else{

        /* navigate('/profile') */
      }

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

      {invites.length > 0 && 
       <section  className="containerPpal invitatiosSection">
          <h3>Invitations</h3>
          <div className="invitationsGallery">
            {invites?.map((elem,index) => {
              return (
                  <ProjectInvitationCard 
                    elem={elem} 
                    index = {index}
                    updateInvite={updateInvite}
                    key={elem.project_id}
                  />
              );
            })}
        </div>
       </section>    
      }

      <section className="containerPpal offersSection">
                <div className="offerGallery">
                {review?.map((elem,index) => {
                  return (
                    <ResearcherReviewCard
                      key={index} 
                      elem={elem}
                    /> 
                  )
                })}
                </div>
                  
      
            </section>

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
