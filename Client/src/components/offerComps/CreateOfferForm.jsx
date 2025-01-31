import { useNavigate, useParams } from 'react-router-dom';
import { createOfferScheme} from '../../schemes/createOfferScheme'
import { useState, useContext } from 'react';
import { fetchData2 } from '../../helpers/axiosHelper';
import { ZodError } from 'zod';
import { AgoraContext } from '../../context/ContextProvider';

const initialValue = {
  offer_title:'',
  number_of_position:0,
  offer_description:''

}

export const CreateOfferForm = () => {

  const { token } = useContext(AgoraContext);
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
        /^[a-zA-Z0-9 ]+$/.test(inputValueSkills.trim())    
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
      createOfferScheme.parse(offer)
      
      const skillsString = skills.join(",");
      let data = { ...offer, skill_name: skillsString};
      
      await fetchData2(`offer/createoffer/${id}`, 'post', data, { Authorization: `Bearer ${token}`  })
       navigate(`/oneproject/${id}`)
       
    } catch (error) {  

      const fieldErrors = {};

      if (error instanceof ZodError){
        //const fieldErrors = {}; // should it be inside if?
        error.errors.forEach((err)=>{
          fieldErrors[err.path[0]]=err.message
        })
        setValErrors(fieldErrors)
      } else {
        setMsg(error.response?.data.message)
        
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
            value={offer?.offer_title || ""}
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
            value={offer?.number_of_position || ""} 
            onChange={handleChange}
            name='number_of_position'
          />
        </fieldset>

        <fieldset className='textareaField textareaBig'>
        <label htmlFor="description">Description</label>
        <textarea 
          id="offer_description" 
          type="text"
          placeholder='description'
          value={offer?.offer_description || ""}
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
        {valErrors.offer_title && <p>{valErrors.offer_title}</p>}
        {valErrors.offer_description && <p>{valErrors.offer_description}</p>}
        {valErrors.number_of_position && <p>{valErrors.number_of_position}</p>}
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
