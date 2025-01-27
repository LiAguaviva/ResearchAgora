import React, { useContext } from "react";
import avatarDefault from "../../assets/imgs/defaultIMG.png";
import { AgoraContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import message from '../../assets/icons/message.svg'
import '../../pages/Chat/chat.css';

export const UserAllUsersCard = ({ elem, showRequestModal }) => {

  const { user } = useContext(AgoraContext);
  const skills = elem.skills?.split(", ");
  const navigate = useNavigate();  


  const onMessageClick = () => {
    navigate(`/chat/${elem.user_id}`)
  }
  
  return (
    <div className="userCardWithButton">
      <div className="userCard">
          <img
            className="userCardAvatar"
            src={
              elem?.user_avatar
                ? `http://localhost:4000/images/useravatar/${elem?.user_avatar}`
                : avatarDefault
            }
            onClick={()=>navigate(`/researcher/${elem?.user_id}`)}
            alt="your avatar"
          />

        <div className="userCardData">
          <p className="UserCardName">
            {" "}
            {elem?.user_name} {elem?.user_lastname}
          </p>
          {/* <p>
            {elem?.user_city}
          </p> */}
          <p>
           {user?.user_proficiency}
          </p>
            <div className="tagsContainer">
              {skills?.map((skill, index) => (
                <div key={index} className="tagDeleteable">
                  {skill}
                </div>
              ))}
            </div>
        </div>
      </div>
      <div className="buttons">
        {/* <button onClick={onMessageClick} className="messageButton"
        >Message </button> */}
        { user?.user_id !== elem.user_id &&
          <>
            <img 
              src={message} alt="" 
              onClick={onMessageClick}
              className="messageIcon"
            />
          <button onClick={()=>showRequestModal()}>Invite</button>
          </>
        }
      </div>
    </div>
  );
};
