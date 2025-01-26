import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OfferCard.css";
import { AgoraContext } from "../../../context/ContextProvider";
import { fetchData2, fetchDataValidation } from "../../../helpers/axiosHelper";

export const OfferCard = ({ elem, project, requests, isMember }) => {
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

  const editOffer = async (e) => {
    e.preventDefault();
    
  }

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

     {/* <div className='buttons'>
     {user?.user_id !== project[0]?.creator_user_id && 
       applyButton === 'apply' &&
          <button 
            onClick={onSubmit}
            className='accept'
          >Apply</button>}

     {user?.user_id !== project[0]?.creator_user_id && 
       applyButton === 'applied' &&
          <button 
            // onClick={onSubmit}
            className='applied'
          >Applied</button>}

     {user?.user_id !== project[0]?.creator_user_id && 
       applyButton === 'teamMember' &&
          <button 
            // onClick={onSubmit}
            className='disabled'
          >Team Member</button>}

     {user?.user_id !== project[0]?.creator_user_id && 
       applyButton === 'notSelected' &&
          <button 
            // onClick={onSubmit}
            className='disabled'
          >Not selected</button>}

      {user?.user_id === project[0]?.creator_user_id &&
        <button 
          className='accept'
          // onClick={editOffer}
      >edit</button>}

      {user?.user_id === project[0]?.creator_user_id &&
        <button 
          className='cancel'
          // onClick={deleteOffer}
      >Delete</button>}
      </div> */}


<div className="buttons">
  {user?.user_id !== project[0]?.creator_user_id && !isMember && 
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
      <button className="edit" onClick={editOffer}>
        Edit
      </button>
      <button className="cancel" onClick={deleteOffer}>
        Delete
      </button>
    </>
  )}
</div>


    </div>
  );
};
