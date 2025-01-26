import React from 'react'
import './FooterApp.css'
import { NavLink, useNavigate } from 'react-router-dom'
import fb from '../../../assets/icons/facebook.svg'
import ig from '../../../assets/icons/instagram.svg'
import linkedin from '../../../assets/icons/linkedin.svg'
import x from '../../../assets/icons/x.svg'

export const FooterApp = () => {

  const navigate = useNavigate();

  return (
    <footer>
      <div className='footerContent'>
        <div className='logoFooter' />
        <nav 
              className='footerNav' 
              id='menuAbout'
             >

              <NavLink
                  to={'/infolayout/about'}
                  className={({ isActive })=>(isActive? 'active':'inactive')}
                >About</NavLink>

              <NavLink
                  to={'/infolayout/Metrics'}
                  className={({ isActive })=>(isActive? 'active':'inactive')}
                >Metrics</NavLink>

              <NavLink
                  to={'/infolayout/Partnership'}
                  className={({ isActive })=>(isActive? 'active':'inactive')}
                >Partnership</NavLink>

              <NavLink
                  to={'/infolayout/contact'}
                  className={({ isActive })=>(isActive? 'active':'inactive')}
                >Contact</NavLink>
                </nav>

                <div className='socialMediaIcons'>
                    <img className='icon' src={fb} alt="" />
                    <img className='icon' src={ig} alt="" />
                    <img className='icon' src={linkedin} alt="" />
                    <img className='icon' src={x} alt="" />
                  </div>
              <p>Copyright ResearchAgora Inc. 2024</p>
              </div>
    </footer>
  )
}
