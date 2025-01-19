import React from 'react'
import './FooterApp.css'
import { NavLink, useNavigate } from 'react-router-dom'

export const FooterApp = () => {

  const navigate = useNavigate();

  return (
    <footer>
      <div className='logoFooter' />
      <nav 
            className='footerNav' 
            id='menuAbout'
           >

            <NavLink
                to={'about'}
                className={({ isActive })=>(isActive? 'active':'inactive')}
              >About</NavLink>

            <NavLink
                to={'metrics'}
                className={({ isActive })=>(isActive? 'active':'inactive')}
              >Metrics</NavLink>

            <NavLink
                to={'partnership'}
                className={({ isActive })=>(isActive? 'active':'inactive')}
              >Partnership</NavLink>

            <NavLink
                to={'contact'}
                className={({ isActive })=>(isActive? 'active':'inactive')}
              >Contact</NavLink>
              </nav>
    </footer>
  )
}
