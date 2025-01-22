import React, { useEffect, useState } from "react";
import { ProjectInfoCard } from "../../../components/ProjectInfoCard/ProjectInfoCard";
import { OfferCard } from "../../../components/offerCard/offerCard";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataValidation } from "../../../helpers/axiosHelper";
import { UserCard } from "../../../components/UserCard/UserCard";
import { ProjectMemberCard } from "../ProjectMemberCard/ProjectMemberCard";
import './OneProject.css'

export const OneProject = () => {

  const navigate = useNavigate();

  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [members, setMembers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [review, setReview] = useState([]);
  const [offers, setOffers] = useState([]);

  const fetchOneProject = async () => {
    try {
      const result = await fetchDataValidation(
        `http://localhost:4000/api/project/oneproject/${id}`,
        "get"
      );
      console.log("RESULT FORM BACK ------>", result);
      setProject(result.project); 
      setMembers(result.members);
      setSkills(result.skills);
      setOffers(result.offers);
      //setReview(result.review);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOneProject();
  }, []);

  console.log('PROJECT on oneproject', project);
  console.log('ONE PROJECT skills', skills);
  

  return (
    <div className="oneProjectPage">
      <section className="containerPpal">
        <ProjectInfoCard 
          project={project[0]} 
          skills={skills}
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
           <div key={elem.offer_id}>
             <OfferCard elem={elem}/> 
           </div>
          )
        })}
        </div>
        <button onClick={()=>navigate(`/createOffer/${id}`)}>Create Offer</button>

      </section>
    </div>
  );
};
