import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchData } from '../../helpers/axiosHelper'
import { ZodError } from 'zod'
import { registerScheme } from '../../schemes/registerScheme'

const initialValue = {
  email:"",
  password:"",
  repPassword:"",
}

export const RegisterForm = ({showModal}) => {

  const navigate = useNavigate();
  const [register, setRegister] = useState(initialValue);
  const [valErrors, setValErrors] = useState({})
  const [msg, setMsg] = useState('')


  const validateField = (name, value) => {
      try {
        registerScheme.pick({[name]: true}).parse({[name]:value});
        setValErrors({...valErrors, [name]:''})
      } catch (error) {
        setValErrors({...valErrors, [name]:error.errors[0].message})
      }
    }
  

  const handleChange = (e)=> {
    const {name, value} = e.target;
    if(name === 'accept'){
      setRegister({...register, accept:e.target.checked })
    } else {
      setRegister({...register, [name]:value})
    }

    validateField(name, value)
  } 

  const onSubmit = async (e)=> {
    e.preventDefault();
    // validar 
    try {
      const res = await fetchData('/register', 'post', register)
      // console.log(res);
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
        console.log(error);
        setMsg(error.response.data.message)
        console.log('error message', error.response.data.message);
      }

      console.log('ERRORRRRRR', error.response.data);
      setMsg(error.response.data)
      // console.log('MSG MSG MSG MSG', error.response);
    }
  }

  // console.log(register);
  

  return (
    <div className='formAppContainer'>
    <form className='formApp'>
      <p className='formTitle'>Register</p>
      <div className='separatorThick' />
      <fieldset>
        <label htmlFor="email">Email</label>
        <input 
          id='email'
          type="email" 
          placeholder='Email'
          value={register.email}
          onChange={handleChange}
          name='email'
        />
      </fieldset>

      <fieldset>
        <label htmlFor="password">Password</label>
        <input 
          id='password'
          type="password" 
          placeholder='Password'
          value={register.password}
          onChange={handleChange}
          name='password'
        />
      </fieldset>

      <fieldset>
        <label htmlFor="repPassword">Repeat Password</label>
        <input 
          id='repPassword'
          type="password" 
          placeholder='Repeat Password'
          value={register.repPassword}
          onChange={handleChange}
          name='repPassword'
        />
      </fieldset>

      <div className='separatorThick' />
      <p>Already registered? <Link to={'/login'}  className="loginRegisterLink">LOG IN</Link></p>

      <div className="errorMsg">
      {valErrors.email && <p>{valErrors.email}</p>}
      {valErrors.password && <p>{valErrors.password}</p>}
      {valErrors.repPassword && <p>{valErrors.repPassword}</p>}
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
