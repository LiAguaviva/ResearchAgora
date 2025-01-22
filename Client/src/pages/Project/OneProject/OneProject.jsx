import React, { useEffect, useState } from "react";
import { ProjectInfoCard } from "../../../components/ProjectInfoCard/ProjectInfoCard";
import { OfferCard } from "../../../components/offerCard/offerCard";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataValidation } from "../../../helpers/axiosHelper";
import { UserCard } from "../../../components/UserCard/UserCard";
import { ProjectMemberCard } from "../ProjectMemeberCard/ProjectMemeberCard";
import './OneProject.css'

export const OneProject = () => {

  const navigate = useNavigate();

  const { id } = useParams();
  const [project, setProject] = useState([]);

  const fetchOneProject = async () => {
    try {
      const result = await fetchDataValidation(
        `http://localhost:4000/api/project/oneproject/${id}`,
        "get"
      );
      // console.log("RESULT FORM BACK ------>", result);
      setProject(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOneProject();
  }, []);

  return (
    <div className="oneProjectPage">
      <section className="containerPpal">
        <ProjectInfoCard project={project[0]} />
      </section>

      <div className="containerPpal">
        <div className="separatorThick" />
      </div>
      
      <section className="containerPpal membersSection">
        <h3>Members of the project</h3>


        <div className="membersGallery">
        {project?.map((elem, index) => {
          return (
            <ProjectMemberCard key={index} elem={elem}/>
          );
        })}
        </div>
      </section>

      <section className="containerPpal offersSection">
        <div className="offerGallery">
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
        {/* {project?.map((elem, index) => {
          return (
            <OfferCard />
          )
        })} */}
        </div>
        <button onClick={()=>navigate('/createOffer')}>Create Offer</button>
      </section>
    </div>
  );
};
