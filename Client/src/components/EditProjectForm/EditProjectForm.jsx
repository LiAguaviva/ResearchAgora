import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchData } from '../../helpers/axiosHelper'

const initialValue = {
  title:"",
  city:"",
  country:"",
  description:"",
  link:"",
  type:"",
  max_member:"",
}

export const EditProjectForm = () => {

  const navigate = useNavigate();
  const [project, setProject] = useState(initialValue);
  const [msg, setMsg] = useState('')

  const handleChange = (e)=> {
    const {name, value} = e.target;
    if(name === 'accept'){
      setProject({...project, accept:e.target.checked })
    } else {
      setProject({...project, [name]:value})
    }
  } 

  const onSubmit = (e)=> {
    e.preventDefault();
  }

  return (
    <div className='myFormContainer'>
    <form className='myForm'>
      <p className='formTitle'>Edit a Project</p>
      <div className='separator' />
      <fieldset>
        <label htmlFor="email">Title</label>
        <input 
          id='title'
          type="text" 
          placeholder='Title'
          // value={project.title}
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
          // value={project.city}
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
          // value={project.repPassword}
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
          // value={offer.description}
          onChange={handleChange}
          name="description" 
        />
        </fieldset>

      {/* SKILLS ON ANNOUNCEMENT??? OR JUST ON THE OFFERS */}
      <fieldset className='textareaLit'>
        <label htmlFor="skills">skills</label>
        <textarea 
          id="skills" 
          type="text"
          placeholder='skills'
          // value={offer.skills}
          onChange={handleChange}
          name="skills" 
        />
        </fieldset>

        <fieldset>
        <label htmlFor="max_num">Max number of collaborators</label>
        <input 
          id='max_num'
          type="number" 
          placeholder='Max number of collaborators'
          // value={project.max_num}
          onChange={handleChange}
          name='max_num'
        />
      </fieldset>
        
      {/* <fieldset>
        <label htmlFor="link">Link</label>
        <input 
          id='link'
          type="text" 
          placeholder='Link'
          // value={project.link}
          onChange={handleChange}
          name='link'
        />
      </fieldset>
         */}
         
      <fieldset>
        <label htmlFor="typeOptions">type</label>
        <label 
          id='typeOptions'
          type="text" 
          placeholder='type'
          // value={project.type}
          onChange={handleChange}
          name='type'
        />

        <select 
          id='typeOptions'
          type="text" 
          placeholder='type'
          // value={project.type}
          onChange={handleChange}
          name='type'
        >
          <option value={false}>Public</option>
          <option value={true}>Private</option>
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
