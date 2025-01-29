import { useState, useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ZodError } from "zod";
import { fetchData2 } from "../../../helpers/axiosHelper";
import { createOfferScheme } from "../../../schemas/createOfferScheme";
import { AgoraContext } from "../../../context/ContextProvider.jsx";

const editOfferScheme = createOfferScheme.partial();

const initialValue = {
  offer_title: "",
  offer_description: "",
  number_of_position: "",
};


export const EditOfferCard = () => {
  const { token } = useContext(AgoraContext);
  const [offer, setOffer] = useState(initialValue);
  const {id} = useParams();
  const [skills, setSkills] = useState([]);
  const [inputValueSkills, setInputValueSkills] = useState("");
  const [valErrors, setValErrors] = useState({});
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
      const fetchOneOffer = async () => {
      try {
        const result = await fetchData2(
          `offer/oneoffer/${id}`, 
          "get"
        );
         console.log("OFFFFEEEEEEEEEEEEER", result);

         if (result && result[0]) {
          // Si result[0].skills es un array de objetos, extraemos los skill_name
          const skills = result.map((skill) => skill.skill_name);
          setSkills(skills);
         
          console.log("skill, offer", result)
        } else {
          console.log("No skills found in the result.");
        } 
        setOffer(result[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOneOffer();
    }, [id]);
    
      
    // useEffect(() => {
    //   fetchOneOffer();
    // }, [id]);

   
    /* useEffect(() => { //last version with Alba
      const fetchOneOffer = async () => {
        try {
          const result = await fetchData2(`offer/oneoffer/${id}`, "get");
          console.log("OFFFFEEEEEEEEEEEEER", result);
          if (result.skills) {
            setSkills(result.skills.map(skill => skill.skill_name));
          } else {
            console.log("No skills found in the result.");
          }
          setOffer(result[0]);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchOneOffer();
    }, [id]); */
    
   
    const validateField = (name, value) => {
        try {
          createOfferScheme.pick({ [name]: true }).parse({ [name]: value });
          setValErrors({ ...valErrors, [name]: "" });
        } catch (error) {
          setValErrors({ ...valErrors, [name]: error.errors[0].message });
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "accept") {
          setOffer({ ...offer, accept: e.target.checked });
        } else {
          setOffer({ ...offer, [name]: value });
        }
        validateField(name, value);
      };
    
      const handleKeyDownSkill = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (
            inputValueSkills.trim() !== "" &&
            inputValueSkills.trim().length > 1 &&
            /^[a-zA-Z0-9]+$/.test(inputValueSkills.trim())
          ) {
            setSkills([...skills, inputValueSkills.trim()]);
            setInputValueSkills("");
          }
        }
      };

      const removeSkill = (index) => {
      const newSkills = [...skills];
      newSkills.splice(index, 1);
      setSkills(newSkills);
    };

     const onSubmit = async (e) => {
      e.preventDefault();
        try {
         const skillsString = skills.join(",");
         const data = { ...offer, skill: skillsString, offer_id: id };
        //  console.log("----> submitting data to back", data);
         console.log("----> submitting data to back", data);
         editOfferScheme.parse(data);
         
        const result = await fetchData2(
        `offer/updateoffer/${id}`,
         "put",
        data,
         { Authorization: `Bearer ${token}` }
        );
        console.log('response', result);
        navigate(`/oneproject/${offer.project_id}`)

      } catch (error) {
         if (error instanceof ZodError) {
          const fieldErrors = {};
             error.errors.forEach((err) => {
             fieldErrors[err.path[0]] = err.message;
        });
          setValErrors(fieldErrors);
             console.log("fieldError", fieldErrors);
          } else {
            console.log('Error updating offer', error);
            setMsg(error.response?.data?.message);
            console.log("error message", error.response.data.message);
        }
            console.log(error);
         }
       };

      
      
        

  return (
    <div className="formAppContainer">
     <form className="formApp">
       <p className="formTitle">Edit the Offer</p>
      <div className="separatorThick" />

      <fieldset>
        <label htmlFor="offer_title">Title</label>
       <input
          id="offer_title"
          type="text"
          placeholder="Title"
          value={offer?.offer_title}
          onChange={handleChange}
          name="offer_title"
        />
      </fieldset>



        <fieldset>
          <label htmlFor="number_of_position">Number of positions</label>
          <input
            id="number_of_position"
            type="number"
            placeholder="Number of positions"
            value={offer?.number_of_position}
            onChange={handleChange}
            name="number_of_position"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="offer_description">Description</label>
          <input
            id="offer_description"
            type="text"
            placeholder="Description"
            value={offer?.offer_description}
            onChange={handleChange}
            name="offer_description"
          />
        </fieldset>

        
        <fieldset className="textareaLit">
          <label htmlFor="skills">Skills</label>
          <div className="tagsContainer">
            {skills.map((skill, index) => (
              <div key={index} className="tagDeleteable">
                {skill}
                <span
                  onClick={() => removeSkill(index)}
                  className="deleteBtn"
                >
                  ×
                </span>
              </div>
            ))}
          </div>

          <input
            type="text"
            value={inputValueSkills}
            onChange={(e) => setInputValueSkills(e.target.value)}
            onKeyDown={handleKeyDownSkill}
            placeholder="Add a skill"
          />
        </fieldset>

        <div className="separatorThick" />

        <div className="errorMsg">
          {valErrors.offer_title && <p>{valErrors.offer_title}</p>}
          {valErrors.offer_description && <p>{valErrors.offer_description}</p>}
          {valErrors.number_of_position && <p>{valErrors.number_of_position}</p>}
          {<p>{msg}</p>}
        </div>

        <div className="buttons">
          <button className="accept" onClick={onSubmit}>
            SUBMIT
          </button>
          <button
            className="cancel"
            type="button"
            //onClick={() => navigate(`/oneoffer/${data?.offer_id}`)} //last version with Alba
            onClick={() => navigate(`/oneproject/${id}`)}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

  


