import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const initialValue = {
  offer_title:'',
  offer_description:'',
  positionCont:''
}

export const CreateOfferForm = () => {

  const [msg, setMsg] = useState('')
  const navigate = useNavigate();
  const [offer, setOffer] = useState('')
  
  const handleChange = (e)=> {
    const {name, value} = e.target;
    setLogin({...login, [name]:value})
  } 

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='myFormContainer'>
      <form className='myForm'>
        <p className='formTitle'>Add an Offer</p>
        <div className='separator' />
        <fieldset>
          <label htmlFor="OfferTitle">OfferTitle</label>
          <input 
            id='OfferTitle'
            type="text" 
            placeholder='Offer Title'
            // value={login.password}
            onChange={handleChange}
            name='OfferTitle'
          />
        </fieldset>

        <fieldset>
          <label htmlFor="positionCont">Number of Positions</label>
          <input 
            id='positionCont'
            type="text" 
            placeholder='Number of positions'
            value={offer.positionCont}
            onChange={handleChange}
            name='positionCont'
          />
        </fieldset>

        <fieldset className='textareaField'>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          type="text"
          placeholder='description'
          value={offer.description}
          onChange={handleChange}
          name="description" 
        />
        </fieldset>

        <div className='separator' />

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
