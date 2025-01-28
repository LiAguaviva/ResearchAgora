import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OfferCard.css";
import { AgoraContext } from "../../../context/ContextProvider";
import { fetchData2 } from "../../../helpers/axiosHelper";

export const OfferCard = ({ elem, project, requests, isMember }) => {
  const [skill, setSkill] = useState([]);
  const { user } = useContext(AgoraContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSkill(elem.offer_skills?.split(","));
  }, [user, project]);

  const deleteOffer = async () => {
    try {
      await fetchData2(`offer/deleteoffer/${elem.offer_id}`, "put");
      let result = await fetchData2(
        `offer/deleteoffer/${elem.offer_id}`,
        "put"
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const editOffer = async (e) => {
    e.preventDefault();
    navigate(`/edit/${elem.offer_id}`)
    
  }

  /* const onSubmit = async (e) => {
    try {
      let data = {
        offer_id: elem.offer_id,
        user_id: user?.user_id,
        project_id: project[0].project_id,
      };
      let joinrequest = await fetchData2(`offer/joinrequest`, "post", data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }; */

  const onSubmit = async () => {
    try {
      let data = {
        offer_id: elem.offer_id,
        user_id: user?.user_id,
        project_id: project[0].project_id,
      };
      await fetchData2(`offer/joinrequest`, "post", data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };


  const userRequest = requests.find(
    (req) => req.user_id === user?.user_id && req.offer_id === elem.offer_id
  );
  
  console.log('HELOWOWOWO -->',requests)
  return (
    <div className="offerCard">
      <div className="headOffer">
        <h4>{elem.offer_title}</h4>
        <p className="vacancies">
          Available positions: {elem.number_of_position}
        </p>
      </div>
      <p>{elem.offer_description}</p>

      {skill[0] !== "" ? (
        <div className="tagsContainer">
          {skill.map((el, index) => (
            <div className="tag" key={index}>
              {el}
            </div>
          ))}
        </div>
      ) : (
        <p>No skills required</p>
      )}


      <div className="buttons">
        {user?.user_id !== project[0]?.creator_user_id && !isMember && (
          <>
            {userRequest?.request_status === 0 ? (
              <button className="applied" disabled>
                Applied
              </button>
            ) : userRequest?.request_status === 2 ? (
              <button className="disabled" disabled>
                Rejected
              </button>
            ) : elem.number_of_position > 0 ? (
              <button onClick={onSubmit} className="accept">
                Apply
              </button>
            ) : null}
          </>
        )}
      </div>

        {user?.user_id === project[0]?.creator_user_id && (
          <div className="buttons">
            <button className="edit" 
            onClick={editOffer}
            >Edit</button>
            
            <button className="cancel" onClick={deleteOffer}
            >Delete</button>
          </div>
        )}

    </div>
  );
};
