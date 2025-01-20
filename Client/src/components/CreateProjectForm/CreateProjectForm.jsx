import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchDataValidation } from '../../helpers/axiosHelper'
import { AgoraContext } from '../../context/ContextProvider'

const initialValue = {
  title:"",
  city:"",
  country:"",
  description:"",
  status:1,
  type:0,
  max_member:"",
}

export const CreateProjectForm = () => {

  const navigate = useNavigate();
  const {user} = useContext(AgoraContext);
  const [project, setProject] = useState(initialValue);
  const [msg, setMsg] = useState('')
  const [skills, setSkills] = useState([])
  const [inputValueSkills, setInputValueSkills] = useState("");

  const handleChange = (e)=> {
    const {name, value} = e.target;
    if(name === 'accept'){
      setProject({...project, accept:e.target.checked })
    } else {
      setProject({...project, [name]:value})
    }
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
      const skillsString = skills.join(",");
      let data = { ...project, skill_name: skillsString};
      console.log(data);
      const result = await fetchDataValidation(`http://localhost:4000/api/project/addproject/${user.user_id}`,'post', data);
      navigate('/profile')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='myFormContainer'>
    <form className='myForm'>
      <p className='formTitle'>Create a Project</p>
      <div className='separator' />
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
            <div key={index} className="tag">
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
            placeholder="Añade una skill y pulsa Enter"
          />
      </fieldset>

        <fieldset>
        <label htmlFor="max_num">Max number of collaborators</label>
        <input 
          id='max_num'
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

     
        

      <div className='separator' />

      <div className="errorMsg">
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
