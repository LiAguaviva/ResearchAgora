import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchDataValidation } from '../../../helpers/axiosHelper';
import './AccountVerified.css'
import logo from '../../../assets/logo/Logo_full_PurpleBlue.png'
const urlUser = import.meta.env.VITE_SERVER_URL_USER;

export const AccountVerified = () => {

   const { token } = useParams();

   const navigate = useNavigate();
    
  useEffect(() => {
    const fetchUser = async() => {
      try {
        const res = await fetchDataValidation (`${urlUser}/verifyAccount/${token}`, "get")
        console.log('verify REEEESSS', res);
        
      } catch (error) {
        console.log(error);  
      }
    }
    fetchUser();
  }, [])
  

  return (
    <section className='accountVerifiedSect'>
      <div className='containerPpal accountVerified'>
        <img src={logo} alt="Research Agora Logo" className='logo'/>
        <h2>Welcome Aboard!</h2>
        <div className='textInfo'>
        <p>Your account has been successfully verified.</p>
        <p>You can now complete your profile and start using our service.</p>
        </div>
        <button onClick={()=>navigate('/login')}>Log In</button>
      </div>
    </section>
  )
}
