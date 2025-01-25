import React, { useContext, useEffect, useRef, useState } from "react";
import { ProjectInfoCard } from "../../../components/projectsComp/ProjectInfoCard/ProjectInfoCard";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataValidation } from "../../../helpers/axiosHelper";
import { UserCard } from "../../../components/usersComp/UserCard";
import { ProjectMemberCard } from "../ProjectMemberCard/ProjectMemberCard";
import './OneProject.css'
import { OfferCard } from "../../../components/offerComps/OfferCard/OfferCard";
import { GoBack } from "../../../components/navigationComps/GoBack/GoBack";
import { AgoraContext } from "../../../context/ContextProvider";
import { ProjectReviewCard } from "../../../components/projectsComp/ProjectReviewCard";


export const OneProject = () => {

  const navigate = useNavigate();
  const {user} = useContext(AgoraContext)
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [members, setMembers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [review, setReview] = useState([]);
  const [offers, setOffers] = useState([]);

  const [applyButton, setApplyButton] = useState('apply');


  const fetchOneProject = async () => {

    try {
      const result = await fetchDataValidation(
        `http://localhost:4000/api/project/oneproject/${id}`,
        "get"
      );
      // console.log("RESULT FORM BACK ------>", result);
      setProject(result.project); 
      setMembers(result.members);
      setSkills(result.skills.map(skill => skill.skill_name));
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
  }, [user, applyButton]);

  const fetchJoinRequest = async () => {
    try {
      let data = {user_id: user?.user_id,
                  project_id: id
      }
      
      const result = await fetchDataValidation(`http://localhost:4000/api/project/allrequests`, 'post', data);

      if(result[0].request_status === 1){
        setApplyButton('applied')
      } else if (result[0].request_status === 2){
        setApplyButton('teamMember')
      } if(result[0].request_status === 3){
        setApplyButton('notSelected')
      }
      // console.log('apply button', applyButton);
      // console.log('result.request_status', result[0].request_status);
      
    } catch (error) {
      console.log(error);
    }
  }


  // console.log('PROJECT on oneproject', project);
  // console.log('USER on oneproject', user);
  // console.log('ONE PROJECT skills', skills);
  

  return (
    <div className="oneProjectPage">
      <section className="containerPpal">
        <ProjectInfoCard 
          project={project[0]} 
          skills={skills}
          members={members}
        />
      </section>
             
      <div className="containerPpal">
        <div className="separatorThick" />
      </div>
      
      <section className="containerPpal membersSection">
        <h3>Members of the project</h3>

        <div className="membersGallery">

        {members?.map((elem) => {
          return (
                <ProjectMemberCard key={elem.user_id} elem={elem}/>
          );
        })}
        </div>
      </section>

      <section className="containerPpal offersSection">
        <div className="offerGallery">
        {offers?.map((elem) => {
          return (
             <OfferCard 
              key={elem.offer_id} 
              elem={elem}
              project={project}
              applyButton={applyButton}
             /> 
          )
        })}
        </div>
          <button onClick={()=>navigate(`/createOffer/${id}`)}
          >Create Offer</button>


      </section>
      <section className="containerPpal offersSection">
        <div className="offerGallery">
        {review?.map((elem,index) => {
          return (
             <ProjectReviewCard
              key={index} 
              elem={elem}
             /> 
          )
        })}
        </div>
          

        <GoBack />

      </section>
    </div>
  );
};
