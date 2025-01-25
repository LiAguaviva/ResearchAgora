import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ZodError } from "zod";
import { fetchData2 } from "../../../helpers/axiosHelper";
import { createOfferScheme } from "../../../schemas/createOfferScheme";


const initialValue = {
  offer_title: "",
  offer_description: "",
  number_of_position: "",
};


export const EditOfferCard = () => {
  const [offer, setOffer] = useState(initialValue);
  const {id} = useParams();
  const [skills, setSkills] = useState([]);
  const [inputValueSkills, setInputValueSkills] = useState("");
  const [valErrors, setValErrors] = useState({});
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");


      const fetchOneOffer = async () => {
      try {
        const result = await fetchData2(
          `offer/oneoffer/${id}`,
          "get"
        );
         console.log("OFFFFEEEEEEEEEEEEER", result);
         if (result && result.length > 0 && result[0].skills) {
          // Si result[0].skills es un array de objetos, extraemos los skill_name
          setSkills(result.map(skill => skill.skill_name));
        } else {
          console.log("No skills found in the result.");
        }
         
        setOffer(result[0]);
       
      } catch (error) {
        console.log(error);
      }
    };
      
    // useEffect(() => {
    //   fetchOneOffer();
    // }, [id]);

   
    useEffect(() => {
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
    }, [id]);
    
   
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
        //  try {
        //    e.preventDefault();
        //    const skillsString = skills.join(",");
        //   //  let data = { ...offer, skill: skillsString, id: id };
        //   //  console.log("----> data al back", data);
        //    const result = await fetchDataValidation(
        //      `http://localhost:4000/api/project/editproject`,
        //      "put",
        //      data
        //    );
        //    navigate(`/oneproject/${id}`)
     
        //  } catch (error) {
        //    if (error instanceof ZodError) {
        //      error.errors.forEach((err) => {
        //        fieldErrors[err.path[0]] = err.message;
        //      });
        //      setValErrors(fieldErrors);
        //      console.log("fieldError", fieldErrors);
        //    } else {
        //      console.log(error);
        //      setMsg(error.response.data.message);
     
        //      console.log("error message", error.response.data.message);
        //    }
        //    console.log(error);
        //  }
       };

      
      
        

  return (
    <div className="formAppContainer">
     <form className="formApp">
       <p className="formTitle">Edit an Offer</p>
      <div className="separatorThick" />

      <fieldset>
        <label htmlFor="email">Title</label>
       <input
          id="title"
          type="text"
          placeholder="Title"
          value={offer?.offer_title}
          onChange={handleChange}
          name="title"
        />
      </fieldset>



        <fieldset>
          <label htmlFor="Number of positions">Number of positions</label>
          <input
            id="Number of positions"
            type="number"
            placeholder="Number of positions"
            value={offer?.number_of_position}
            onChange={handleChange}
            name="number_of_position"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="description">description</label>
          <input
            id="description"
            type="text"
            placeholder="description"
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
            onClick={() => navigate(`/oneoffer/${data?.offer_id}`)}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

  


