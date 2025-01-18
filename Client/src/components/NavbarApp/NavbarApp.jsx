import React, { useContext } from 'react'
import logo from '../../../src/assets/logo/Logo_short_WhiteBlue.png'
import './NavbarApp.css'
import { NavLink, useNavigate } from 'react-router-dom'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider'
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;


export const NavbarApp = () => {

  const navigate = useNavigate()
  const {user} = useContext(AgoraContext)

  return (
    <header>
      <nav className='myNavBar'>
        <img 
          onClick={()=>navigate('/')}
          src={logo} 
          className="logoNavbar" alt="" 
        />

        {/* ///////// LINKS ///////// */}
        <ul className='navLinks'>
        <li>
            <NavLink
              to={'/'}
              className={({ isActive })=>(isActive? 'active':'inactive')}
            >Home</NavLink>
        </li>
        <li>
            <NavLink
              to={'/infolayout'}
              className={({ isActive })=>(isActive? 'active':'inactive')}
            >About</NavLink>
        </li>
        <li>
            <NavLink
              to={'/register'}
              className={({ isActive })=>(isActive? 'active':'inactive')}
            >Sing Up</NavLink>
        </li>
        <li>
            <NavLink
              to={'/login'}
              className={({ isActive })=>(isActive? 'active':'inactive')}
            >Log In</NavLink>
        </li>
        <li>
        { user &&
              <div className='userNav'>
              <img 
              className='avatarNav'
              onClick={()=>navigate('/profile')}
              src={user?.user_avatar? `${url}/useravatar/${user.user_avatar}` : avatarDefault} alt="your avatar" />
              <p> {user?.name}</p>
            </div>}
        </li>
        
        </ul>
      </nav>
    </header>
  )
}
