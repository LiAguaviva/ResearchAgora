import React, { useContext, useState } from 'react'
import logo from '../../../src/assets/logo/Logo_short_WhiteBlue.png'
import './NavbarApp.css'
import { NavLink, useNavigate } from 'react-router-dom'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider'
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;


export const NavbarApp = () => {

  const navigate = useNavigate()
  const {user, setToken} = useContext(AgoraContext)

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  const [menuUser, setMenuUser] = useState(false)
  const [menuAbout, setMenuAbout] = useState(false)

  const openUserMenu = () => {
    setMenuUser(true)
    setMenuAbout(false)
  }

  const openAboutMenu = () => {
    setMenuUser(false)
    setMenuAbout(true)
  }

  const closeDropdown = () => {
    setMenuAbout(false)
    setMenuUser(false)
  }

  const logOut = () => {
    localStorage.removeItem('agoraToken')
    setUser();
    setToken();
  }

  hamburger?.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });

  return (
    <header>
      <nav className='myNavBar'>
        <div className='bar'>
        <img 
          onClick={()=>navigate('/')}
          onMouseEnter={closeDropdown}
          src={logo} 
          className="logoNavbar" alt="" 
        />

        {/* ///////// LINKS ///////// */}
        <ul className='navLinks'>
        <li>
            <NavLink
              to={'/'}
              className={({ isActive })=>(isActive? 'active':'inactive')}
              onMouseEnter={closeDropdown}
            >Home</NavLink>
        </li>
        <li>
            <NavLink
              to={'/infolayout'}
              className={({ isActive })=>(isActive? 'active':'inactive')}
              onMouseEnter={openAboutMenu}
            >About</NavLink>
        </li>
        <li className='loginRegisterButtons'>
            {!user && <button
              onClick={()=>navigate('/register')}
              className={({ isActive })=>(isActive? 'active':'inactive')}
            >Sing Up</button>}
        </li>
        <li className='loginRegisterButtons'>
            {!user && <button
              onClick={()=>navigate('/login')}
              className={({ isActive })=>(isActive? 'active':'inactive')}
            >Log In</button>}
        </li>
        <li>
        { user &&
              <div className='userNav'>
              <img 
                className='avatarNav'
                onMouseOver={openUserMenu}
                src={user?.user_avatar? `${url}/useravatar/${user.user_avatar}` : avatarDefault} alt="your avatar" 
              />
              {menuUser && 
             <div 
              className='menuDropdown menuUser' 
              id='menuUser'
              onMouseLeave={()=>setMenuUser(false)}
             >
              <div className='separator' />
                <NavLink
                    to={'/profile'}
                    className={({ isActive })=>(isActive? 'active':'inactive')}
                  >Profile</NavLink>
                <div className='separator' />
                <NavLink
                    to={'/personalData'}
                    className={({ isActive })=>(isActive? 'active':'inactive')}
                  >Personal Data</NavLink>
                <div className='separator' />
                <NavLink
                    to={'/editProfile'}
                    className={({ isActive })=>(isActive? 'active':'inactive')}
                  >Settings</NavLink>
                <div className='separator' />
                <NavLink
                    to={'/'}
                    className={({ isActive })=>(isActive? 'active':'inactive')}
                    onClick={logOut}
                  >Log Out</NavLink>
              </div>}
              
              {menuAbout && 
               <div 
                className='menuDropdown menuAbout' 
                id='menuAbout'
                onMouseLeave={()=>setMenuAbout(false)}
               >
                  <div className='separator' />
                <NavLink
                    to={'/infolayout/about'}
                    className={({ isActive })=>(isActive? 'active':'inactive')}
                    onMouseEnter={openAboutMenu}
                  >About</NavLink>
                  <div className='separator' />
                <NavLink
                    to={'/infolayout/Metrics'}
                    className={({ isActive })=>(isActive? 'active':'inactive')}
                    onMouseEnter={openAboutMenu}
                  >Metrics</NavLink>
                  <div className='separator' />
                <NavLink
                    to={'/infolayout/Partnership'}
                    className={({ isActive })=>(isActive? 'active':'inactive')}
                    onMouseEnter={openAboutMenu}
                  >Partnership</NavLink>
                  <div className='separator' />
                <NavLink
                    to={'/infolayout/Contact'}
                    className={({ isActive })=>(isActive? 'active':'inactive')}
                    onMouseEnter={openAboutMenu}
                  >Contact</NavLink>
               </div>}
            </div>}
        </li>
        </ul>
        </div>
      </nav>
      
      
        

         
       
    </header>
  )
}
