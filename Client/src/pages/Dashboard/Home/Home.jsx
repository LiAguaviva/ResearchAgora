import React from 'react'
import { RegisterForm } from '../../../components/RegisterForm/RegisterForm'
import { CreateOfferForm } from '../../../components/CreateOfferForm/CreateOfferForm'
import { CreateProjectForm } from '../../../components/CreateProjectForm/CreateProjectForm'
import { EditProfileForm } from '../../../components/EditProfileForm/EditProfileForm'
import { EditProjectForm } from '../../../components/EditProjectForm/EditProjectForm'
import { LoginForm } from '../../../components/LoginForm/LoginForm'
import logo from '../../../assets/logo/Logo_full_PurpleBlue.png'
import avatarDefault from '../../../assets/imgs/defaultIMG.png'
import './Home.css'


export const Home = () => {
  return (
    <>
    <section className='homeLogoSection'>
    <div className='containerPpal homeLogo'>
      <img src={logo} alt="Research Agora Logo" />
      {/* <img src="/../src/assets/logo/Logo_full_PurpleBlue.png" alt="" /> */}
      <h1>Discuss. Share. Collaborate.</h1>
      <p>Better research together</p>
    </div>
    </section>

    <section className='whoWeAreSection'>
      <div className='containerPpal whoWeAre'>
        <h2>Who We Are</h2>
        <p>At Research Agora, we believe that a change in how research is shared and assessed must take place. New research assessment agreements like DORA and CoARA advocate for a more open and collaborative research culture that takes into account all research outputs, from publications to science outreach and open science policies. 
        </p>
        <p>
        We aim to provide a platform that will help you showcase your achievements as a researcher, but also to provide a forum to share your research, initiate collaborations and create an active community in which research integrity and reproducibility are the core values.
        </p>
      </div>
    </section>

    <section className='researchers'>
    <div>
          <div className='userCard'>
            <div className='userCardAvatar'>
              <img 
                className='userCardAvatar'
                // src={user?.user_avatar? `${url}/useravatar/${user.user_avatar}` : avatarDefault}  
                src={avatarDefault}
                alt="your avatar" 
              />
            </div>
    
            <div className='containerPpal userCardData'>
              <p className='UserCardName'>David Lynch</p>
              <p>Audiovisual,</p>
            </div>
          </div>  
        </div>
    </section>

    </>
  )
}
