import React, { useContext } from "react";
import avatarDefault from "../../assets/imgs/defaultIMG.png";
import { AgoraContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import message from "../../assets/icons/message.svg";
import "../../pages/Chat/chat.css";
const urlImg = import.meta.env.VITE_IMAGEPROVIDER_URL;


export const UserAllUsersCard = ({ elem, showRequestModal }) => {
  const { user } = useContext(AgoraContext);
  const skills = elem.skills?.split(",");
  const navigate = useNavigate();

  const onMessageClick = () => {
    navigate(`/chat/${elem.user_id}`);
  };

  return (
    <div className="userCardWithButton">
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
              ? `${urlImg}/useravatar/${elem?.user_avatar}`
              : avatarDefault
          }
          alt="user profile picture"
        />

        <div className="userCardData">
          <p
            className="UserCardName"
            onClick={() =>
              elem.user_id !== user.user_id
                ? navigate(`/researcher/${elem.user_id}`)
                : navigate("/profile")
            }
          >
            {elem?.user_name} {elem?.user_lastname}
          </p>
          {/* <p>
            {elem?.user_city}
          </p> */}
          <p>{elem?.user_proficiency}</p>
          <div className="tagsContainer">
            {skills[0] !== "" ? (
              <>
                {skills?.map((skill, index) => (
                  <div key={index} className="tag">
                    {skill}
                  </div>
                ))}
              </>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
      <div className="buttons">
        {/* <button onClick={onMessageClick} className="messageButton"
        >Message </button> */}
        {user?.user_id !== elem.user_id && (
          <>
            <img
              src={message}
              alt="message icon to click to open the chat"
              onClick={onMessageClick}
              className="messageIcon"
            />
            <button onClick={() => showRequestModal()}>Invite</button>
          </>
        )}
      </div>
    </div>
  );
};
