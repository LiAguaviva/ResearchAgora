import React, { useContext, useState } from "react";
import projectDefaultIMG from "../../../assets/imgs/molecule_1.png";
import './ProjectProfileCard.css'
import { useNavigate } from "react-router-dom";
import { AgoraContext } from "../../../context/ContextProvider";
const urlImg = import.meta.env.VITE_IMAGEPROVIDER_URL;


export const ProjectProfileCard = ({ elem }) => {
  const navigate = useNavigate();
  const { user, project } = useContext(AgoraContext);
  const [skills, setSkills] = useState(elem.skills?.split(","));
  const [stateClassname, setStateClassname] = useState("");


  return (
    <div className="projectProfileCard">
      <img
        onClick={() => navigate(`/oneproject/${elem.project_id}`)}
        className="profileProjectImg"
        src={
          project?.image
            ? `${urlImg}/users/${project.image}`
            : projectDefaultIMG
        }
        alt="project image"
      />

      <div className="info">
        <h4 
          className="projectTitle"
          onClick={() => navigate(`/oneproject/${elem.project_id}`)}
        >{elem.project_title}</h4>

        {user?.user_id === elem?.creator_user_id ? (
          <p className="creator">Creator</p>
        ) : (
          <p className="researcher">Researcher</p>
        )}

        <div className="tagsContainer">
          {skills?.map((skill, index) => (
            <div key={index} className="tag">
              {skill}
            </div>
          ))}
        </div>
        <div className="Status {stateClassname}">
          {elem.project_status === 1 && <p className="status active">active</p>}
          {elem.project_status === 2 && <p className="status closed">completed</p>}
          {elem.project_status === 3 && <p className="status paused">paused</p>}
        </div>

      </div>
    </div>
  );
};
