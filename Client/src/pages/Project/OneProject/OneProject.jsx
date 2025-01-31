import React, { useContext, useEffect, useState } from "react";
import { ProjectInfoCard } from "../../../components/projectsComp/ProjectInfoCard/ProjectInfoCard";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData2 } from "../../../helpers/axiosHelper";
import "./OneProject.css";
import { OfferCard } from "../../../components/offerComps/OfferCard/OfferCard";
import { GoBack } from "../../../components/navigationComps/GoBack/GoBack";
import { AgoraContext } from "../../../context/ContextProvider";
import { ProjectReviewCard } from "../../../components/projectsComp/ProjectReviewCard";
import { RequestCard } from "../../../components/usersComp/RequestCard/RequestCard";
import { ProjectMemberCard } from "../../../components/projectsComp/ProjectMemberCard";
import leave from '../../../assets/icons/leave.svg'

export const OneProject = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AgoraContext);
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [members, setMembers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [review, setReview] = useState([]);
  const [offers, setOffers] = useState([]);
  const [requests, setrequests] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [requestsview, setrequestsview] = useState([]);

  const [applyButton, setApplyButton] = useState("apply");
  // const changeApplyButton = () => {
  //   if (project.request_status )
  // }

  const memberStatus = members.some(
    (member) => member.user_id === user?.user_id
  );

  useEffect(() => {
    setIsMember(members.some((member) => member.user_id === user?.user_id));
  }, [members, user]);

  const fetchRequest = async () => {
    try {
      let data = { user_id: user?.user_id, project_id: id };

      const result = await fetchData2(
        `user/pendingrequeststatus`,
        "post",
        data,
       { Authorization: `Bearer ${token}` 
    });
      setrequestsview(result);
      
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOneProject = async () => {
    try {
      const result = await fetchData2(
        `project/oneproject/${id}`,
        "get",
        null,
        { Authorization: `Bearer ${token}`  }
      );
        if (result.project.length === 0) {
          throw new Error('Project Not Found!')
        }
      setProject(result.project);
      setMembers(result.members);
      setSkills(result.skills.map((skill) => skill.skill_name));
      setOffers(result.offers);
      setReview(result.review);
    } catch (error) {
      console.log(error);
      navigate('/errorpage')
    }
  };

  useEffect(() => {
    if (token) {
      fetchOneProject();
      fetchJoinRequest();
      fetchRequest();
    }
  }, [user, applyButton,token]);


  const fetchJoinRequest = async () => {
    try {
      let data = { user_id: user?.user_id, project_id: id };

      const result = await fetchData2(
        `project/allrequests`,
        "post",
        data,
        { Authorization: `Bearer ${token}`  }
      );

      

      /*   if(result[0].request_status === 1){
        setApplyButton('applied')
      } else if (result[0].request_status === 2){
        setApplyButton('teamMember')
      } if(result[0].request_status === 3){
        setApplyButton('notSelected')
      } */
      setrequests(result);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRequest = async (elem, value, choose) => {
    try {
      let data = {
        user_id: elem?.user_id,
        project_id: elem.project_id,
        offer_id: elem.offer_id,
        request_status: value,
        choose: choose,
      };
      const result = await fetchData2(
        "user/updaterequeststatus",
        "patch",
        data, 
        { Authorization: `Bearer ${token}` }
        
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };


    const deletemember = async() => {
      try {
        let data = {user_id : user.user_id, project_id: project[0].project_id};
        await fetchData2('project/deleteMember', 
          'post', 
          data,
          { Authorization: `Bearer ${token}` }
        );
        window.location.reload();
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="oneProjectPage">
      <section className="containerPpal">
        <ProjectInfoCard
          project={project[0]}
          skills={skills}
          members={members}
        />
      </section>

      
      <section className="skillsSection containerPpal">
        <h3>Skills</h3>
        <div className="tagsContainer">
            {skills.map((skill, index) => (
              <div key={index} className="tag">
                {skill}
              </div>
            ))}
          </div>
      </section>

      <div className="containerPpal">
        <div className="separatorThick" />
      </div>

      <section className="containerPpal membersSection">
        <h3>Members of the project</h3>
        
       
          
        <div className="membersGallery">
          {members?.map((elem) => {
            return (
              <ProjectMemberCard
                key={elem.user_id}
                elem={elem}
                project={project}
              />
            );
          })}
        </div>
      </section>


      <div className="containerPpal">
        <div className="separatorThick" />
      </div>

      {requestsview.length > 0 && (
        <>
        <section className="containerPpal requestSection">
          <h3>You have requests to join on your projects!</h3>
          <div className="requestGallery">
            {requestsview?.map((elem) => {
              return (
                <RequestCard
                elem={elem}
                updateRequest={updateRequest}
                key={elem.project_id}
                />
              );
            })}
          </div>
        </section>
        <div className="containerPpal">
        <div className="separatorThick" />
      </div>
        </>
      )}

      <section className="containerPpal offersSection">
        <div className="offerGallery">
          {offers?.map((elem) => {
            return (
              <OfferCard
                key={elem.offer_id}
                elem={elem}
                project={project}
                requests={requests}
                applyButton={applyButton}
                isMember={isMember}
              />
            );
          })}
        </div>
        {user?.user_id === project?.[0]?.creator_user_id && (
          <button onClick={() => navigate(`/createOffer/${id}`)}>
            Create Offer
          </button>
        )}
      </section>
      
      <section className="containerPpal offersSection">
        <div className="offerGallery">
          {review?.map((elem, index) => {
            return <ProjectReviewCard key={index} elem={elem} />;
          })}
        </div>
          </section>

        {isMember && project[0].creator_user_id !== user?.user_id && 
          <section className="leaveProject containerPpal">

          <img 
            src={leave} alt="" 
            onClick={() => deletemember()}
            className="leaveIcon"
          />
          <p>Leave Project</p>
          </section>
        }
        <GoBack />
    </div>
  );
};
