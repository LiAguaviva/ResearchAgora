import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OfferCard.css";
import { AgoraContext } from "../../../context/ContextProvider";
import { fetchData2, fetchDataValidation } from "../../../helpers/axiosHelper";

export const OfferCard = ({ elem, project, requests }) => {
  const [skill, setSkill] = useState([]);
  const { user } = useContext(AgoraContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSkill(elem.offer_skills?.split(","));
  }, [user, project]); // Asegurar que se ejecuta cuando `user` o `project` cambian

  const deleteOffer = async () => {
    try {
      let result = await fetchData2(
        `offer/deleteoffer/${elem.offer_id}`,
        "put"
      );
      window.location.reload()();
    } catch (error) {
      console.log(error);
    }
  };
  const editOffer = async () => {
    
  }

  // ///////////////////////////////////////
  /* const onSubmit = async(e) => {
    e.preventDefault();
    try {
      let data = {skills: skills?.join(',')};
      if (!skills.length) {
        fetchUsers()
      } else {
        const result = await fetchDataValidation('http://localhost:4000/api/user/findUsersBySkills', 'post',data);
        console.log('result: ', result)
        setusers(result)
      }
    } catch (error) {
      console.log(error);
    }
  } */
  // ///////////////////////////////////////

  const onSubmit = async (e) => {
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
  };

  // console.log("request (offer) on offerCARD", requests);
  // console.log("project_id on offerCARD", project_id);
  //  console.log('elem', elem);

  return (
    <div className="offerCard">
      <div className="headOffer">
        <h4>{elem.offer_title}</h4>
        <p className="vacancies">
          Available positions: {elem.number_of_position}
        </p>
      </div>
      <p>{elem.offer_description}</p>

      <div className="tagsContainer">
        {skill?.map((el, index) => {
          return (
            <div className="tag" key={index}>
              {el}
            </div>
          );
        })}
      </div>

      <div className="buttons">
        {user?.user_id !== project[0]?.creator_user_id &&
          !requests.some(
            (req) =>
              req.user_id === user?.user_id &&
              req.project_id === project[0]?.project_id &&
              req.request_status === 2
          ) &&
          (() => {
            if (
              requests.some(
                (req) =>
                  req.offer_id === elem.offer_id && req.request_status === 0
              )
            ) {
              return (
                <button className="applied" disabled>
                  Applied
                </button>
              );
            } else if (
              !requests.some((req) => req.offer_id === elem.offer_id) &&
              elem.number_of_position > 0
            ) {
              return (
                <button onClick={onSubmit} className="accept">
                  Apply
                </button>
              );
            }
            return null;
          })()}

        {user?.user_id === project[0]?.creator_user_id && (
          <>
            <button className="cancel" onClick={deleteOffer}>
              Delete
            </button>
            <button className="cancel" onClick={editOffer}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};
