import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchDataValidation } from '../../helpers/axiosHelper'
import { AgoraContext } from '../../context/ContextProvider'
import { createProjectSchema } from '../../schemas/createProjectSchema'
import { ZodError } from 'zod';

const initialValue = {
  title:"",
  city:"",
  country:"",
  description:"",
  status:1,
  type:0,
  max_member:0,
}

export const CreateProjectForm = () => {

  const navigate = useNavigate();
  const {user, token} = useContext(AgoraContext);
  const [project, setProject] = useState(initialValue);
  const [msg, setMsg] = useState('')
  const [skills, setSkills] = useState([])
  const [inputValueSkills, setInputValueSkills] = useState("");
  const [fields, setFields] = useState([]);
  const [valErrors, setValErrors] = useState({})

  const validateField = (name, value) => {
    try {
      createProjectSchema.pick({[name]: true}).parse({[name]:value});
      setValErrors({...valErrors, [name]:''})
    } catch (error) {
      setValErrors({...valErrors, [name]:error.errors[0].message})
    }
  }

  const handleChange = (e)=> {
    const {name, value} = e.target;
    if(name === 'accept'){
      setProject({...project, accept:e.target.checked });
    } else {
      setProject({...project, [name]:value});
    }
    validateField(name, value);
  } 

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

  const onSubmit = async(e)=> {
    try {
      e.preventDefault();
      createProjectSchema.parse(project);

      const skillsString = skills.join(",");
      let data = { ...project, skill_name: skillsString};
      console.log(token);
      
      const result = await fetchDataValidation(`http://localhost:4000/api/project/addproject/${user.user_id}`,
      'post', 
      data, 
       { Authorization: `Bearer ${token}`  }
    
      
    );

      navigate(`/oneproject/${result}`)
    } catch (error) {

      const fieldErrors = {};

      if (error instanceof ZodError){
              error.errors.forEach((err)=>{
                fieldErrors[err.path[0]]=err.message
              })
              setValErrors(fieldErrors)
              console.log('fieldError', fieldErrors);
            } else {
              console.log(error);
              setMsg(error.response.data.message)
              
              console.log('error message', error.response.data.message);
            }
      console.log(error);
    }
  }

  return (
    <div className='formAppContainer'>
    <form className='formApp'>
      <p className='formTitle'>Create a Project</p>
      <div className='separatorThick' />
      <fieldset>
        <label htmlFor="email">Title</label>
        <input 
          id='title'
          type="text" 
          placeholder='Title'
          value={project.title}
          onChange={handleChange}
          name='title'
        />
      </fieldset>

      <fieldset>
        <label htmlFor="city">City</label>
        <input 
          id='city'
          type="text" 
          placeholder='City'
          value={project.city}
          onChange={handleChange}
          name='city'
        />
      </fieldset>

      <fieldset>
        <label htmlFor="country">Country</label>
        <input 
          id='country'
          type="text" 
          placeholder='Country'
          value={project.country}
          onChange={handleChange}
          name='country'
        />
      </fieldset>

      <fieldset className='textareaBig'>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          type="text"
          placeholder='description'
          value={project.description}
          onChange={handleChange}
          name="description" 
        />
        </fieldset>

      {/* SKILLS ON ANNOUNCEMENT??? OR JUST ON THE OFFERS */}
      <fieldset className="textareaLit">
        <label htmlFor="skills">Skills</label>
        <div className="tagsContainer">
          {skills.map((skill, index) => (
            <div key={index} className="tagDeleteable">
              {skill}
              <span 
                onClick={() => removeSkill(index)} 
                className="deleteBtn"
                // value={editUser?.skills ? editUser.skills : ''}
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

        <fieldset>
        <label htmlFor="max_member">Max number of collaborators</label>
        <input 
          id='max_member'
          type="number" 
          placeholder='Max number of collaborators'
          value={project.max_member}
          onChange={handleChange}
          name='max_member'
        />
      </fieldset>
         
      <fieldset>
        <label htmlFor="typeOptions">type</label>
        <label 
          id='typeOptions'
          type="text" 
          placeholder='type'
          value={project.type}
          onChange={handleChange}
          name='type'
        />

        <select 
          id='typeOptions'
          type="text" 
          placeholder='type'
          value={project.type}
          onChange={handleChange}
          name='type'
        >
          <option value={0}>Public</option>
          <option value={1}>Private</option>
        </select>
      </fieldset>

     
        

      <div className='separatorThick' />

      <div className="errorMsg">
      {valErrors.title && <p>{valErrors.title}</p>}
      {valErrors.city && <p>{valErrors.city}</p>}
      {valErrors.country && <p>{valErrors.country}</p>}
      {valErrors.user_description && <p>{valErrors.user_description}</p>}
      {valErrors.max_member && <p>{valErrors.max_member}</p>}
      { <p>{msg}</p>}
      </div>

      <div className='buttons'>
        <button 
          className="accept"
          onClick={onSubmit}
        >ACCEPT</button>
        <button 
          className="cancel"
          type='button'
          onClick={()=>navigate('/')}
        >CANCEL</button>
      </div>
    </form>
    </div>
  )
}
