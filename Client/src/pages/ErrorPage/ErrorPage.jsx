import React from 'react'
import logo from '../../assets/logo/Logo_full_PurpleBlue.png'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {

  const navigate = useNavigate();
  return (
    <section className='accountVerifiedSect'>
          <div className='containerPpal accountVerified'>
            <img src={logo} alt="Research Agora Logo" className='logo'/>
            <div className='textInfo errorText'>
            <p>Error 404</p>
            <p>Molecule Not Found</p>
            </div>
            <button onClick={()=>navigate('/')}>Reload</button>
          </div>
        </section>
  )
}
