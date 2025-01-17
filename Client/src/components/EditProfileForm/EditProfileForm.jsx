import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchData } from '../../helpers/axiosHelper'
import { AgoraContext } from '../../context/ContextProvider'
import SkillsInput from '../SkillsInputs/SkillsInput'

const initialValue = {
  user_name:"",
  user_lastname:"",
  user_country:"",
  user_city:"",
  user_description:"",
  skills: "",
  fields: ""
}

export const EditProfileForm = () => {

  const navigate = useNavigate();

  const [editUser, setEditUser] = useState(initialValue);  
  const {user, setUser, token} = useContext(AgoraContext);
  const [msg, setMsg] = useState('');

  const [file, setFile] = useState('')
  const [fields, setFields] = useState([])
  const [skills, setSkills] = useState([])
  const [inputValueSkills, setInputValueSkills] = useState("");
  const [inputValueFields, setInputValueFields] = useState("");

  useEffect(()=>{
    if(user){
      setEditUser(user)
    }
  }, [user])

  // skills
  const handleKeyDownSkill = (e) => {
    if (e.key === "Enter" && inputValueSkills.trim() !== "" && inputValueSkills.trim().length > 1) {
      e.preventDefault();
      setSkills([...skills, inputValueSkills.trim()]);
      setInputValueSkills("");
    }
  };

  // field
  const handleKeyDownField = (e) => {
    if (e.key === "Enter" && inputValueFields.trim() !== "" && inputValueFields.trim().length > 1) {
      e.preventDefault();
      setFields([...fields, inputValueFields.trim()]);
      setInputValueFields("");
    }
  };

  // tag
  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleChange = (e)=> {
    const {name, value} = e.target;
    if(name === 'accept'){
      setEditUser({...editUser, accept:e.target.checked })
    } else {
      setEditUser({...editUser, [name]:value})
    }
  } 

  const handleFile = (e) => setFile(e.target.files[0]);

  const onSubmit = async (e)=> {

    try {
      e.preventDefault();
      const skillsString = skills.join(",");
      const fieldstring = fields.join(",");
      
      let data = {...editUser, skills:skillsString, fields:fieldstring}

      const newFormData = new FormData();
      newFormData.append('edit', JSON.stringify(data)); 
      newFormData.append('file', file);


      // setEditUser({...editUser, [skills]:skillsString, [fields]:fieldstring})
      //mandar data(variable temporal) al back con axios
      console.log('token', token);
      console.log('data', data);
      const result = await fetchData('/editUser', 'put', newFormData, {Authorization:`Bearer ${token}`})
      setUser(data);
      navigate('/profile')
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className='myFormContainer'>
    <form className='myForm'>
      <p className='formTitle'>Edit Profile</p>
      <div className='separator' />
      <fieldset>
        <label htmlFor="name">name</label>
        <input 
          id='name'
          type="name" 
          placeholder='Name'
          value={editUser?.user_name}
          onChange={handleChange}
          name='user_name'
        />
      </fieldset>

      <fieldset>
        <label htmlFor="lastname">Last name</label>
        <input 
          id='lastname'
          type="lastname" 
          placeholder='Lastname'
          value={editUser?.user_lastname}
          onChange={handleChange}
          name='user_lastname'
        />
      </fieldset>

      <fieldset>
        <label htmlFor="country">country</label>
        <input 
          id='country'
          type="country" 
          placeholder='country'
          value={editUser?.user_country ? editUser?.user_country : ''}
          onChange={handleChange}
          name='user_country'
        />
      </fieldset>

      <fieldset>
        <label htmlFor="city">city</label>
        <input 
          id='city'
          type="city" 
          placeholder='city'
          value={editUser?.user_city? editUser?.user_city : ''}
          onChange={handleChange}
          name='user_city'
        />
      </fieldset>

      <fieldset className='textareaBig'>
        <label htmlFor="description">Description</label>
        <textarea className='textarea'
          id="description" 
          type="text"
          placeholder='description'
          value={editUser?.user_description ? editUser?.user_description : ''}
          onChange={handleChange}
          name="user_description" 
        />
        </fieldset>

        <fieldset className="textareaLit">
        <label htmlFor="skills">Skills</label>
        <div className="tagsContainer">
          {skills.map((skill, index) => (
            <div key={index} className="tag">
              {skill}
              <span 
                onClick={() => removeSkill(index)} 
                className="deleteBtn"
                value={editUser?.skills ? editUser.skills : ''}
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
        <fieldset className="textareaLit">
        <label htmlFor="fields">Fields</label>
        <div className="tagsContainer">
          {fields.map((field, index) => (
            <div key={index} className="tag">
              {field}
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
            value={inputValueFields}
            onChange={(e) => setInputValueFields(e.target.value)}
            onKeyDown={handleKeyDownField}
            placeholder="Añade una skill y pulsa Enter"
          />
      </fieldset>

        <fieldset className='avatarInput'>
          <label htmlFor="file">avatar</label>
          <input 
            type="file" 
            onChange={handleFile}
          />
        </fieldset>


      <div className='separator' />
      {/* <p>Already registered? <Link to={'/login'}  className="formLink">LOG IN</Link></p> */}

      <div className="errorMsg">
      { <p>{msg}</p>}
      </div>

      <div className='buttons'>
        <button 
          className="accept"
          onClick={onSubmit}
        >SAVE CHANGES</button>
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
