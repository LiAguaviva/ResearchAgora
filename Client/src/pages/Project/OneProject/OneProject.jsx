import React, { useContext, useEffect, useRef, useState } from "react";
import { ProjectInfoCard } from "../../../components/projectsComp/ProjectInfoCard/ProjectInfoCard";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataValidation } from "../../../helpers/axiosHelper";
import { UserCard } from "../../../components/usersComp/UserCard";
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
  const { user } = useContext(AgoraContext);
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [members, setMembers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [review, setReview] = useState([]);
  const [offers, setOffers] = useState([]);
  // const [applyButton, setApplyButton] = useState(true);
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

      const result = await fetchDataValidation(
        `http://localhost:4000/api/user/managerequests`,
        "post",
        data
      );
      setrequestsview(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOneProject = async () => {
    try {
      const result = await fetchDataValidation(
        `http://localhost:4000/api/project/oneproject/${id}`,
        "get"
      );
      // console.log("RESULT FORM BACK ------>", result);
      setProject(result.project);
      setMembers(result.members);
      setSkills(result.skills.map((skill) => skill.skill_name));
      setOffers(result.offers);
      setReview(result.review);
      //setReview(result.review);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOneProject();
    fetchJoinRequest();
    fetchRequest();
  }, [user, applyButton]);

  // console.log('---->',requests)
  // console.log('---->',project)
  // console.log('---->',user)
  // console.log('---->',project[0]?.creator_user_id === user?.user_id)

  const fetchJoinRequest = async () => {
    try {
      let data = { user_id: user?.user_id, project_id: id };

      const result = await fetchDataValidation(
        `http://localhost:4000/api/project/allrequests`,
        "post",
        data
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

  // console.log("ONE PROJECT MEMBERS", members);
  // console.log("OFFERSSS", offers);

  const updateRequest = async (elem, value, choose) => {
    try {
      let data = {
        user_id: elem?.user_id,
        project_id: elem.project_id,
        offer_id: elem.offer_id,
        request_status: value,
        choose: choose,
      };
      const result = await fetchDataValidation(
        "http://localhost:4000/api/user/updaterequeststatus",
        "patch",
        data
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const leaveProject = async() => {
    try {
      let data = {user_id: user?.user_id, project_id: project[0].project_id}
      await fetchDataValidation('http://localhost:4000/api/project/leaveProject', 'put', data);
      navigate('/allprojects')
    } catch (error) {
      console.log(error);
    }
  }

  // console.log('isMember? -->', isMember);
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
        {user?.user_id === project[0]?.creator_user_id && (
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

        {/* {isMember && project[0].creator_user_id !== user?.user_id && 
          <section className="leaveProject containerPpal">

          <img 
            src={leave} alt="" 
            onClick={() => leaveProject()}
            className="leaveIcon"
          />
          <p>Leave Project</p>
          </section>
        } */}
        <GoBack />
    </div>
  );
};
