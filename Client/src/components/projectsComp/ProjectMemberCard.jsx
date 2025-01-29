import React, { useContext } from "react";
import avatarDefault from "../../assets/imgs/defaultIMG.png";
import { AgoraContext } from "../../context/ContextProvider";
import { fetchDataValidation } from "../../helpers/axiosHelper";
import { useNavigate } from "react-router-dom";
import trash from '../../assets/icons/trash.svg'

export const ProjectMemberCard = ({ elem, project }) => {
  const { user, token } = useContext(AgoraContext);
  const navigate = useNavigate();

  // console.log('user in project member card', user)
  
  const deletemember = async() => {
    try {
      let data = {user_id : elem.user_id, userID : user.user_id,project_id: project[0].project_id};
      await fetchDataValidation('http://localhost:4000/api/project/deleteMember', 'post', data,  { Authorization: `Bearer ${token}` });
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="userCard">
        <img
        onClick={() =>
          elem.user_id !== user.user_id
            ? navigate(`/researcher/${elem.user_id}`)
            : navigate("/profile")
        }
          className="userCardAvatar"
          src={
            elem?.user_avatar
              ? `http://localhost:4000/images/useravatar/${elem.user_avatar}`
              : avatarDefault
          }
          // src={avatarDefault}
          alt="profile picture"
        />

        <div className="userCardData">
          <p 
            className="UserCardName"
            onClick={() =>
              elem.user_id !== user.user_id
                ? navigate(`/researcher/${elem.user_id}`)
                : navigate("/profile")
            }
          > {elem?.user_name}</p>
          <p>{elem?.fields}</p>
        </div>
        {user?.user_id === project[0]?.creator_user_id &&
          elem?.user_id !== project[0]?.creator_user_id && (
            // <button onClick={() => deletemember()} className="editButton">
            //   Delete
            // </button>
            <img 
              src={trash} alt="" 
              onClick={() => deletemember()}
              className="trashIcon"
            />
          )}
      </div>
    </div>
  );
};
