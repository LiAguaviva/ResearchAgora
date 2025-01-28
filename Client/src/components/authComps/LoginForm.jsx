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

  const {user, setUser, token, setToken, } = useContext(AgoraContext);
  const navigate = useNavigate();
  
  const [login, setLogin] = useState(initialValue)
  const [valErrors, setValErrors] = useState({})
  const [msg, setMsg] = useState('')
  const [forgotpassword, setForgotpassword] = useState(false);


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

  const onSubmit = async (e) => {
    e.preventDefault()

    // if (!login.password)

    try {
      const tokenLocal = await fetchData('/login', 'post', login);
      
      const resultUser = await fetchData('/findUserById', 'get', null, {Authorization:`Bearer ${tokenLocal}`});
      console.log('result user', resultUser);
      localStorage.setItem('agoraToken', tokenLocal)
      // setUser(resultUser);
      setToken(tokenLocal);
      if (resultUser[0]?.user_name){
        navigate('/profile');
      } else {
        navigate('/editprofile')
      }
      
    } catch (error) {
      console.log('login error', error);
      setForgotpassword(true);
    }
  }

  // console.log('login', login);
  // console.log('userContext', user);
  // console.log('tokenContext', token);

  

  return (
    <div className='formAppContainer'>
      <form className='formApp'>
        <p className='formTitle'>Log in</p>
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

        <fieldset>
          <label htmlFor="password">Password</label>
          <input 
            id='password'
            type="password" 
            placeholder='Password'
            value={login.password}
            onChange={handleChange}
            name='password'
          />
        </fieldset>

        <div className='separatorThick' />
        <p>Not registered? <Link to={'/register'} className="loginRegisterLink">REGISTER</Link></p>
        {forgotpassword &&
          <Link to={'/forgotPassword'} className="forgotPassword">Forgot your password?</Link>}
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
