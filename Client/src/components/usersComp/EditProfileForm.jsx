import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AgoraContext } from '../../context/ContextProvider'
import { editProfileSchema } from '../../schemas/editProfileSchema'
import { ZodError } from 'zod';
import axios from 'axios'
import { fetchData } from '../../helpers/axiosHelper';

const initialValue = {
  user_name:"",
  user_lastname:"",
  user_country:"",
  user_city:"",
  user_description:"",
  skills: "",
  fields: "",
  user_proficiency: "",
  user_current_lab: "",
  user_current_boss: "",
}

export const EditProfileForm = () => {

  const navigate = useNavigate();

  const [editUser, setEditUser] = useState(initialValue);  
  const {user, setUser, token} = useContext(AgoraContext);
  const [msg, setMsg] = useState('');
  const [valErrors, setValErrors] = useState({});
  const [file, setFile] = useState('')
  const [fields, setFields] = useState([]);
  const [skills, setSkills] = useState([]);
  const [inputValueSkills, setInputValueSkills] = useState("");
  const [inputValueFields, setInputValueFields] = useState("");

 

  useEffect(() => {
    const fetchSkillsAndFields = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/user/getskills&fields",
          { id: user?.user_id }
        );
        setSkills(res?.data[0]?.skills?.split(",") || []);
        setFields(res?.data[0]?.fields?.split(",") || []);
      } catch (error) {
        console.log(error);
      }
    };
    if (user || !user) {
      if (Array.isArray(user) && user.length > 0) {
        setEditUser(user[0]);
      } else {
        setEditUser(user);
      }
      fetchSkillsAndFields();
    }
  }, [user]);

  // skills
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

  // field
  const handleKeyDownField = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        inputValueFields.trim() !== "" &&
        inputValueFields.trim().length > 1 &&
        /^[a-zA-Z0-9]+$/.test(inputValueFields.trim())
      ) {
        setFields([...fields, inputValueFields.trim()]);
        setInputValueFields("");
      }
    }
  };

  // tag
  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const validateField = (name, value) => {
    try {
      editProfileSchema.pick({[name]: true}).parse({[name]:value});
      setValErrors({...valErrors, [name]:''})
    } catch (error) {
      setValErrors({...valErrors, [name]:error.errors[0].message})
    }
  }

  const handleChange = (e)=> {
    const {name, value} = e.target;
    
    if(name === 'accept'){
      setEditUser({...editUser, accept:e.target.checked })
    } else {
      setEditUser({...editUser, [name]:value})
    }
    validateField(name, value)
  } 

  const handleFile = (e) => setFile(e.target.files[0]);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      editProfileSchema.parse(editUser);
      
      const skillsString = skills?.join(",");
      const fieldstring = fields?.join(",");
      let data = { ...editUser, skills: skillsString, fields: fieldstring,user_id : editUser?.user_id};

      const newFormData = new FormData();
      newFormData.append("edit", JSON.stringify(data));
      newFormData.append("file", file);
      // setEditUser({...editUser, [skills]:skillsString, [fields]:fieldstring})
      //mandar data(variable temporal) al back con axios
      const result = await fetchData("/editUser", "put", newFormData, {
        Authorization: `Bearer ${token}`,
      });
      setUser({...editUser, skills: skillsString, fields: fieldstring,user_avatar: result.img ? result?.img : user.user_avatar});
      navigate("/profile");

    } catch (error) {

      const fieldErrors = {};

      if (error instanceof ZodError){
        error.errors.forEach((err)=>{
          fieldErrors[err.path[0]]=err.message
        })
        setValErrors(fieldErrors)
      } else {
        console.log(error);
        setMsg(error.response.data.message)
        console.log('error message', error.response.data.message);
      }
    }
  };

  console.log('edituser', editUser);
  // console.log('user', user);
  
  
  
  return (
    <div className='formAppContainer'>
    <form className='formApp'>
      <p className='formTitle'>Edit Profile</p>
      <div className='separatorThick' />
      <fieldset>
        <label htmlFor="name">name</label>
        <input 
          id='name'
          type="name" 
          placeholder='Name'
          value={editUser?.user_name?editUser?.user_name : ''}
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
          value={editUser?.user_lastname? editUser?.user_lastname : ''}
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
        <fieldset>
        <label htmlFor="proficiency">Proficiency</label>
        <input 
          id='proficiency'
          type="text" 
          placeholder='your current position(student/researcher/doctorant)'
          value={editUser?.user_proficiency ? editUser?.user_proficiency : ''}
          onChange={handleChange}
          name='user_proficiency'
        />
      </fieldset>
      <fieldset>
        <label htmlFor="user_current_lab">Current laboratory</label>
        <input 
          id='current lab'
          type="text" 
          placeholder='your current laboratory'
          value={editUser?.user_current_lab ? editUser?.user_current_lab : ''}
          onChange={handleChange}
          name='user_current_lab'
        />
      </fieldset>
      <fieldset>
        <label htmlFor="current_boss">Current head</label>
        <input 
          id='current_boss'
          type="text" 
          placeholder='your laboratory head'
          value={editUser?.user_current_boss ? editUser?.user_current_boss : ''}
          onChange={handleChange}
          name='user_current_boss'
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
      
        <fieldset className="textareaLit">
        <label htmlFor="fields">Fields</label>
        <div className="tagsContainer">
          {fields.map((field, index) => (
            <div key={index} className="tagDeleteable">
              {field}
              <span 
                onClick={() => removeField(index)} 
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
            placeholder="Add a field"
          />
      </fieldset>

        <fieldset className='avatarInput'>
          <label htmlFor="file">avatar</label>
          <input 
            type="file" 
            onChange={handleFile}
          />
        </fieldset>


      <div className='separatorThick' />

      <div className="errorMsg">
      {valErrors.user_name && <p>{valErrors.user_name}</p>}
      {valErrors.user_lastname && <p>{valErrors.user_lastname}</p>}
      {valErrors.user_country && <p>{valErrors.user_country}</p>}
      {valErrors.user_city && <p>{valErrors.user_city}</p>}
      {valErrors.user_description && <p>{valErrors.user_description}</p>}

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
          onClick={()=>navigate('/profile')}
        >CANCEL</button>
      </div>
    </form>
    </div>
  )
}
