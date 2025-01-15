import { AgoraContext } from '../../context/ContextProvider';
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../schemas/loginSchema';
import { ZodError } from 'zod';
import axios from 'axios';
import { fetchData } from '../../helpers/axiosHelper';

const initialValue = {
  email:'',
  password:''
}

export const LoginForm = () => {

  const {setUser} = useContext(AgoraContext);
  const [login, setLogin] = useState(initialValue)
  const [valErrors, setValErrors] = useState({})
  const [msg, setMsg] = useState('')
  const navigate = useNavigate();

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

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='myFormContainer'>
      <form className='myForm'>
        <p className='formTitle'>Log in</p>
        <div className='separator' />
        <fieldset>
          <label htmlFor="email">Email</label>
          <input 
            id='email'
            type="email" 
            placeholder='Email'
            // value={login.email}
            onChange={handleChange}
            name='email'
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Password</label>
          <input 
            id='password'
            type="text" 
            placeholder='Password'
            // value={login.password}
            onChange={handleChange}
            name='password'
          />
        </fieldset>

        <div className='separator' />
        <p>Not registered? <Link to={'/register'} className="formLink">REGISTER</Link></p>

        <div className="errorMsg">
        {valErrors.email && <p>{valErrors.email}</p>}
        {valErrors.password && <p>{valErrors.password}</p>}
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
