import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../schemas/loginSchema';
import { ZodError } from 'zod';
import axios from 'axios';
import { fetchData } from '../../helpers/axiosHelper';



export const ForgotPasswordForm = ({showModal}) => {

  const navigate = useNavigate();
  const [login, setLogin] = useState('')
  const [valErrors, setValErrors] = useState({})
  const [msg, setMsg] = useState('')

  const validateField = (name, value) => {
    try {
      loginSchema.pick({[name]: true}).parse({[name]:value});
      setValErrors({...valErrors, [name]:''})
    } catch (error) {
      setValErrors({...valErrors, [name]:error.errors[0].message})
    }
  }
  
  const handleChange = (e)=> {
    const {name, value} = e.target;
    setLogin({...login, [name]:value})

    validateField(name, value)
  } 

  const onSubmit = async (e)=> {
    e.preventDefault();
    try {
      let data = {email: login.email}
      const res = await fetchData('/forgottenPassword', 'post', data)
      console.log(res);
      showModal();
      setMsg('');

    } catch (error) {

      const fieldErrors = {};

      if (error instanceof ZodError){
        error.errors.forEach((err)=>{
          fieldErrors[err.path[0]]=err.message
        })
        setValErrors(fieldErrors)
      } else {
        // console.log(error);
        setMsg(error.response.data.message)
        // console.log('error message', error.response.data.message);
      }

      // console.log('ERRORRRRRR', error.response.data);
      setMsg(error.response.data)
      // console.log('MSG MSG MSG MSG', error.response);
    }
  }

  // console.log('login', login);
  // console.log('tokenContext', token);
  

  return (
    <div className='formAppContainer'>
      <form className='formApp'>
        <p className='formTitle'>Forgot your password?</p>
        <div className='separatorThick' />
        <fieldset>
          <label htmlFor="email">Email</label>
          <input 
            id='email'
            type="email" 
            placeholder='Email'
            value={login.email}
            onChange={handleChange}
            name='email'
          />
        </fieldset>

        <div className='separatorThick' />

        <div className="errorMsg">
        {valErrors.email && <p>{valErrors.email}</p>}
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
