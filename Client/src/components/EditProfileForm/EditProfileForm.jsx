import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './EditProfileForm.css'
import { fetchData } from '../../helpers/axiosHelper'
import { AgoraContext } from '../../context/ContextProvider'

const initialValue = {
  name:"",
  lastname:"",
  country:"",
  city:"",
  description:"",
  skills: "",
  fields: ""
}

export const EditProfileForm = () => {

  const navigate = useNavigate();
  const [edit, setEdit] = useState(initialValue);
  const {user} = useContext(AgoraContext)
  const [msg, setMsg] = useState('')

  const [fields, setFields] = useState([])
  const [skills, setSkills] = useState([])

  const handleChange = (e)=> {
    const {name, value} = e.target;
    if(name === 'accept'){
      setEdit({...edit, accept:e.target.checked })
    } else {
      setEdit({...edit, [name]:value})
    }
  } 

  const onSubmit = (e)=> {
    e.preventDefault();
    let data = {...edit, user_id:user.user_id}
    //mandar data(variable temporal) al back con axios
  }

  return (
    <div className='myFormContainer'>
    <form className='editProfileForm'>
      <p className='formTitle'>Edit Profile</p>
      <div className='separator' />
      <fieldset>
        <label htmlFor="name">name</label>
        <input 
          id='name'
          type="name" 
          placeholder='Name'
          // value={user.name}
          onChange={handleChange}
          name='name'
        />
      </fieldset>

      <fieldset>
        <label htmlFor="lastname">Last name</label>
        <input 
          id='lastname'
          type="lastname" 
          placeholder='Lastname'
          // value={user.lastname}
          onChange={handleChange}
          name='lastname'
        />
      </fieldset>

      <fieldset>
        <label htmlFor="country">country</label>
        <input 
          id='country'
          type="country" 
          placeholder='country'
          // value={user.country}
          onChange={handleChange}
          name='country'
        />
      </fieldset>

      <fieldset>
        <label htmlFor="city">city</label>
        <input 
          id='city'
          type="city" 
          placeholder='city'
          // value={user.city}
          onChange={handleChange}
          name='city'
        />
      </fieldset>

      <fieldset className='textareaBig'>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          type="text"
          placeholder='description'
          // value={user.description}
          onChange={handleChange}
          name="description" 
        />
        </fieldset>

      <fieldset className='textareaLit'>
        <label htmlFor="skills">Skills</label>
        <textarea 
          id="skills" 
          type="text"
          placeholder='Skills'
          // value={user.skills}
          onChange={handleChange}
          name="skills" 
        />
        </fieldset>

      <fieldset className='textareaLit'>
        <label htmlFor="fields">Fields</label>
        <textarea 
          id="fields" 
          type="text"
          placeholder='Fields'
          // value={user.fields}
          onChange={handleChange}
          name="fields" 
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
