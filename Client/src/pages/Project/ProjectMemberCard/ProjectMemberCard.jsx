import React, { useContext } from "react";
import avatarDefault from "../../../assets/imgs/defaultIMG.png";
import { AgoraContext } from "../../../context/ContextProvider";
import { fetchDataValidation } from "../../../helpers/axiosHelper";
import { useNavigate } from "react-router-dom";

export const ProjectMemberCard = ({ elem, project }) => {
  const { user } = useContext(AgoraContext);
  const navigate = useNavigate();
  
  const deletemember = async() => {
    try {
      let data = {user_id : elem.user_id, project_id: project[0].project_id};
      console.log('HELLOWWWWW',data)
      await fetchDataValidation('http://localhost:4000/api/project/deleteMember', 'post', data);
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="userCard">
        <img
          className="userCardAvatar"
          src={
            elem?.user_avatar
              ? `http://localhost:4000/images/useravatar/${elem.user_avatar}`
              : avatarDefault
          }
          // src={avatarDefault}
          alt="your avatar"
          onClick={()=>navigate(`/researcher/${elem.user_id}`)}
        />

        <div className="userCardData">
          <p 
            className="UserCardName"
            onClick={()=>navigate(`/researcher/${elem.user_id}`)}
          > {elem?.user_name}</p>
          <p>{elem?.fields}</p>
        </div>
        {user?.user_id === project[0]?.creator_user_id &&
          elem?.user_id !== project[0]?.creator_user_id && (
            <button onClick={() => deletemember()} className="editButton">
              Delete
            </button>
          )}
      </div>
    </div>
  );
};
