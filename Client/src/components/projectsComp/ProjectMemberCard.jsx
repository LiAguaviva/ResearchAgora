import React, { useContext, useState } from "react";
import avatarDefault from "../../assets/imgs/defaultIMG.png";
import { AgoraContext } from "../../context/ContextProvider";
import { fetchData2 } from "../../helpers/axiosHelper";
import { useNavigate } from "react-router-dom";
import trash from '../../assets/icons/trash.svg'
import { DeleteMemberModal } from "./DeleteMemberModal";
const urlImg = import.meta.env.VITE_IMAGEPROVIDER_URL;


export const ProjectMemberCard = ({ elem, project, removeMemberFromState  }) => {
  const { user, token } = useContext(AgoraContext);
  const navigate = useNavigate();
  const [seeDeleteMember, setSeeDeleteMember] = useState(false);
  
  const showDeleteMemberModal = ()=> setSeeDeleteMember(true)
  const closeDeleteMemberModal = ()=> setSeeDeleteMember(false)

  const deletemember = async(e) => {
    e.preventDefault();
    
    try {
      let data = {
                  user_id : elem.user_id, 
                  userID : user.user_id, 
                  project_id: project[0].project_id
                };

      await fetchData2(
                        `project/deleteMember`, 
                        'post', 
                        data,  
                        { Authorization: `Bearer ${token}` });

      removeMemberFromState(elem.user_id);

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
              ? `${urlImg}/useravatar/${elem.user_avatar}`
              : avatarDefault
          }
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
            <img 
              src={trash} alt="" 
              onClick={() => showDeleteMemberModal()}
              className="trashIcon"
            />
          )}
      </div>
      {seeDeleteMember &&
        <DeleteMemberModal 
          closeDeleteMemberModal={closeDeleteMemberModal}
          deletemember={deletemember}
        />}
    </div>
  );
};
