import React, { useContext } from "react";
import avatarDefault from "../../assets/imgs/defaultIMG.png";
import { AgoraContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import '../../pages/Chat/chat.css';

export const UserAllUsersCard = ({ elem }) => {
  const { user } = useContext(AgoraContext);
  const skills = elem.skills?.split(", ");
  const navigate = useNavigate();

  const onMessageClick = () => {
    navigate(`/chat/${elem.user_id}`)
  }
  
  return (
    <div>
      <div className="userCard">
        <div className="userCardAvatar">
          <img
            className="userCardAvatar"
            src={
              elem?.user_avatar
                ? `http://localhost:4000/images/useravatar/${elem?.user_avatar}`
                : avatarDefault
            }
            alt="your avatar"
          />
        </div>

        <div className="userCardData">
          <p className="UserCardName">
            {" "}
            {elem?.user_name} {elem?.user_lastname}
          </p>
          <p>
            {elem?.user_city}
            {user?.user_proficiency}
          </p>
            <div className="tagsContainer">
              {skills?.map((skill, index) => (
                <div key={index} className="tagDeleteable">
                  {skill}
                </div>
              ))}
            </div>
            <button onClick={onMessageClick} className="messageButton">
              Message
            </button>
        </div>
      </div>
    </div>
  );
};
