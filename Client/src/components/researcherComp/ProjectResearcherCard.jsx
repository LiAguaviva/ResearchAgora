import React, { useContext, useState } from "react";
import projectDefaultIMG from "../../assets/imgs/lab1.jpg";
import { useNavigate } from "react-router-dom";
// import { AgoraContext } from "../../../context/ContextProvider";

export const ProjectResearcherCard = ({ elem, researcher }) => {
  const navigate = useNavigate();
  // const { user, project } = useContext(AgoraContext);
  const [skills, setSkills] = useState(elem.skills?.split(","));
  const [stateClassname, setStateClassname] = useState("");

  // console.log('elem on researcher project card', elem);
  
  return (
    <div className="projectProfileCard">
      <img
        onClick={() => navigate(`/oneproject/${elem.project_id}`)}
        className="profileProjectImg"
        src={
          elem?.image
            ? `${url}/images/users/${elem.image}`
            : projectDefaultIMG
        }
        alt="project image"
      />

      <div className="info">
        <h4 
          className="projectTitle"
          onClick={() => navigate(`/oneproject/${elem.project_id}`)}
        >{elem.project_title}</h4>
        {researcher?.user_id === elem?.creator_user_id ? (
          <p className="creatorResearcher">Creator</p>
        ) : (
          <p className="creatorResearcher">Researcher</p>
        )}
        <div className="tagsContainer">
          {skills?.map((skill, index) => (
            <div key={index} className="tag">
              {skill}
            </div>
          ))}
        </div>
        <p className="Status {stateClassname}">
          {elem.project_status === 1 && <p className="status active">active</p>}
          {elem.project_status === 2 && (
            <p className="status closed">completed</p>
          )}
          {elem.project_status === 3 && <p className="status paused">paused</p>}
        </p>

        {/* <div className="description">
          <p>{elem.project_description}</p>
        </div> */}
      </div>
    </div>
  );
};
