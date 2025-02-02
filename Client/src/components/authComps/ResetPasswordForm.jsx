import { AgoraContext } from '../../context/ContextProvider';
import { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../helpers/axiosHelper';
import { loginScheme } from '../../schemes/loginScheme';

const initialValue = {
  newPassword:'',
  confirmNewPassword: ''
}

export const ResetPasswordForm = () => {

  const {user, setUser, token, setToken, } = useContext(AgoraContext);
  const navigate = useNavigate();
  const passwordToken = useParams()
  
  const [login, setLogin] = useState(initialValue)
  const [valErrors, setValErrors] = useState({})
  const [msg, setMsg] = useState('')


  const validateField = (name, value) => {
    try {
      loginScheme.pick({[name]: true}).parse({[name]:value});
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

    try {

      const resultUser = await fetchData(`/resetPassword/${passwordToken.token}`, 'post', login);
      navigate('/login');
      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='formAppContainer'>
      <form className='formApp'>
        <p className='formTitle'>Reset Password</p>
        <div className='separatorThick' />
     

        <fieldset>
          <label htmlFor="newPassword">Password</label>
          <input 
            id='newPassword'
            type="password" 
            placeholder='Password'
            value={login.newPassword}
            onChange={handleChange}
            name='newPassword'
          />
        </fieldset>

        <fieldset>
          <label htmlFor="confirmNewPassword">Repeat Password</label>
          <input 
            id='confirmNewPassword'
            type="text" 
            placeholder='Password'
            value={login.confirmNewPassword}
            onChange={handleChange}
            name='confirmNewPassword'
          />
        </fieldset>

        <div className='separatorThick' />
        <p>Not registered? <Link to={'/register'} className="loginRegisterLink">REGISTER</Link></p>
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
