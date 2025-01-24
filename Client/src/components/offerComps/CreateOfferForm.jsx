import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { createOfferScheme } from '../../schemas/createOfferScheme';
import { fetchData2 } from '../../helpers/axiosHelper';
import { ZodError } from 'zod';

const initialValue = {
  offer_title:'',
  number_of_position:'',
  offer_description:''

}

export const CreateOfferForm = () => {

  const [msg, setMsg] = useState('')
  const navigate = useNavigate();
  const [offer, setOffer] = useState(initialValue)
  const {id}  = useParams();
  const [valErrors, setValErrors] = useState({});
  const [inputValueSkills, setInputValueSkills] = useState("");
  const [skills, setSkills] = useState([])

   const validateField = (name, value) => {
       try {
         createOfferScheme.pick({[name]: true}).parse({[name]:value});
         setValErrors({...valErrors, [name]:''})
       } catch (error) {
         setValErrors({...valErrors, [name]:error.errors[0].message})
       }
     }


   const handleChange = (e)=> {
     const {name, value} = e.target;
     setOffer({...offer, [name]:value});
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

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const skillsString = skills.join(",");
      let data = { ...offer, skill_name: skillsString};
      console.log("data1", data);
      
      await fetchData2(`offer/createoffer/${id}`, 'post', data)
       console.log("envio de la data al back", data);
       navigate(`/oneproject/${id}`)
       
    } catch (error) {  
      if (error instanceof ZodError){
        error.errors.forEach((err)=>{
          fieldErrors[err.path[0]]=err.message
        })
        setValErrors(fieldErrors)
        console.log('fieldError', fieldErrors);
      } else {
        console.log(error);
        setMsg(error.response?.data.message)
        
        console.log('error message', error.response.data.message);
      }   
    }
  }


  return (
    <div className='formAppContainer'>
      <form className='formApp'>
        <p className='formTitle'>Add an Offer</p>
        <div className='separatorThick' />
        <fieldset>
          <label htmlFor="OfferTitle">OfferTitle</label>
          <input 
            id='offer_title'
            type="text" 
            placeholder='Offer Title'
            // value={login.password}
            onChange={handleChange}
            name='offer_title'
          />
        </fieldset>

        <fieldset>
          <label htmlFor="number_of_position">Number of Positions</label>
          <input 
            id='number_of_position'
            type="number" 
            placeholder='Number of positions'
            value={offer.number_of_position}
            onChange={handleChange}
            name='number_of_position'
          />
        </fieldset>

        <fieldset className='textareaField'>
        <label htmlFor="description">Description</label>
        <textarea 
          id="offer_description" 
          type="text"
          placeholder='description'
          value={offer.description}
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

        <div className='separatorThick' />

        <div className="errorMsg">
        {/* {valErrors.password && <p>{valErrors.password}</p>} */}
        <p>{msg}</p>
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
