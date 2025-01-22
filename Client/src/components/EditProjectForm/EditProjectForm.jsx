import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchDataValidation } from "../../helpers/axiosHelper";
import { AgoraContext } from "../../context/ContextProvider";
import { createProjectSchema } from "../../schemas/createProjectSchema";
import { ZodError } from "zod";

const initialValue = {
  title: "",
  city: "",
  country: "",
  description: "",
  status: 1,
  type: 0,
  link: "",
  outcome: "",
  max_member: "",
};

export const EditProjectForm = () => {

  const navigate = useNavigate();
  const [project, setProject] = useState(initialValue);
  const [msg, setMsg] = useState("");
  const [skills, setSkills] = useState([]);
  const [inputValueSkills, setInputValueSkills] = useState("");
  const [valErrors, setValErrors] = useState({});
  const { id } = useParams();
  const [data, setData] = useState([]);
  
    const fetchOneProject = async () => {
      try {
        const result = await fetchDataValidation(
          `http://localhost:4000/api/project/oneproject/${id}`,
          "get"
        );
        // console.log("RESULT FORM BACK ------>", result);
        setSkills(result[0]?.project_skills?.split(",") || []);
        setData(result[0]);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchOneProject();
    }, [id]);
    
    useEffect(() => {
      if (data) {
        let formattedData = {};
        for (let key in data) {
          let newKey = key.startsWith("project_") ? key.slice(8) : key;
          formattedData[newKey] = data[key];
        }
        setProject(formattedData);
      }
    }, [data]);
    

  const validateField = (name, value) => {
    try {
      createProjectSchema.pick({ [name]: true }).parse({ [name]: value });
      setValErrors({ ...valErrors, [name]: "" });
    } catch (error) {
      setValErrors({ ...valErrors, [name]: error.errors[0].message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "accept") {
      setProject({ ...project, accept: e.target.checked });
    } else {
      setProject({ ...project, [name]: value });
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
    try {
      e.preventDefault();
      const skillsString = skills.join(",");
      let data = { ...project, skill: skillsString, id: id };
      console.log("----> data al back", data);
      const result = await fetchDataValidation(
        `http://localhost:4000/api/project/editproject`,
        "put",
        data
      );
      // console.log(result);
      navigate(`/oneproject/${id}`)

    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setValErrors(fieldErrors);
        console.log("fieldError", fieldErrors);
      } else {
        console.log(error);
        setMsg(error.response.data.message);

        console.log("error message", error.response.data.message);
      }
      console.log(error);
    }
  };

  console.log('status', project?.status);
  
  return (
  <div className="formAppContainer">
    <form className="formApp">
      <p className="formTitle">Edit a Project</p>
      <div className="separatorThick" />
      <fieldset>
        <label htmlFor="email">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={project.title}
          onChange={handleChange}
          name="title"
        />
      </fieldset>

        <fieldset>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            placeholder="City"
            value={project.city}
            onChange={handleChange}
            name="city"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            placeholder="Country"
            value={project.country}
            onChange={handleChange}
            name="country"
          />
        </fieldset>

        <fieldset className="textareaBig">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            type="text"
            placeholder="description"
            value={project.description}
            onChange={handleChange}
            name="description"
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
            placeholder="Añade una skill y pulsa Enter"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="max_num">Max number of collaborators</label>
          <input
            id="max_num"
            type="number"
            placeholder="Max number of collaborators"
            value={project.max_member}
            onChange={handleChange}
            name="max_member"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="typeOptions">type</label>
          <label
            id="typeOptions"
            type="text"
            placeholder="type"
            value={project.type}
            onChange={handleChange}
            name="type"
          />

          <select
            id="typeOptions"
            type="text"
            placeholder="type"
            value={project.type}
            onChange={handleChange}
            name="type"
          >
            <option value={0}>Public</option>
            <option value={1}>Private</option>
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="statusOptions">status</label>
          <label
            id="statusOptions"
            type="text"
            placeholder="status"
            value={project?.status}
            onChange={handleChange}
            name="status"
          />

          <select
            id="statusOptions"
            type="text"
            placeholder="status"
            value={project?.status}
            onChange={handleChange}
            name="status"
          >
            <option value={1}>Active</option>
            <option value={2}>Completed</option>
            <option value={3}>Paused</option>
          </select>
        </fieldset>

        {(project?.status === "2" || project?.status === 2) && (
          <>
            <fieldset>
              <label htmlFor="outcome">Outcome</label>
              <input
                id="outcome"
                type="text"
                placeholder="outcome"
                value={project?.outcome}
                onChange={handleChange}
                name="outcome"
              />
            </fieldset>

            <fieldset>
              <label htmlFor="link">Link</label>
              <input
                id="link"
                type="text"
                placeholder="link"
                value={project?.link}
                onChange={handleChange}
                name="link"
              />
            </fieldset>
          </>
        )}

        <div className="separatorThick" />

        <div className="errorMsg">
          {valErrors.title && <p>{valErrors.title}</p>}
          {valErrors.city && <p>{valErrors.city}</p>}
          {valErrors.country && <p>{valErrors.country}</p>}
          {valErrors.user_description && <p>{valErrors.user_description}</p>}
          {valErrors.max_member && <p>{valErrors.max_member}</p>}
          {<p>{msg}</p>}
        </div>

        <div className="buttons">
          <button className="accept" onClick={onSubmit}>
            ACCEPT
          </button>
          <button
            className="cancel"
            type="button"
            onClick={() => navigate(`/oneproject/${data?.project_id}`)}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};
