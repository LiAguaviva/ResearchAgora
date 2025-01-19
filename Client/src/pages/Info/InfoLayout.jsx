import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../../assets/logo/Logo_full_PurpleBlue.png'
import './InfoLayout.css'


export const InfoLayout = () => {

  return (
    <>
    <section className='infoLayoutSect'>
          <div className='containerPpal infoLayout'>
            <div className='infoLayoutHeader'>
            <img src={logo} alt="Research Agora Logo" className='homeLogo'/>
              <h3>We are here to make things different.</h3>
              <p className='subtitle'>Modern day research shaped by scientists for scientists</p>
            </div>
           
           <nav 
            className='infoNav' 
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

            <section className='textInfo'>
             <Outlet />
            </section>
          </div>
        </section>
    </>
  )
}
