import React, { useContext } from 'react'
import logo from '../../../assets/logo/Logo_full_PurpleBlue.png'
import './Home.css'
import moleculeVideo from '../../../assets/video/mulecule.mp4';
import { useNavigate } from 'react-router-dom';
import { AgoraContext } from '../../../context/ContextProvider';
 


export const Home = () => {

  const navigate = useNavigate()
  const {user} = useContext(AgoraContext)

  // use static version if type is less than 3g
  const type = navigator.connection.effectiveType;
  // console.log('typeeeeeeeeeee', type);

  
  return (
    <>
    {/* STATIC */}
    {/* <section className='homeLogoSection static'>
      <div className='containerPpal homeLogo'>
        <img src={logo} alt="Research Agora Logo" />
        <h1>Discuss Share Collaborate</h1>
        <p>Better research together</p>
        <button 
          onClick={()=>navigate('/register')}
          className='homeJoinUs'
        >Join Us</button>

      </div>
    </section> */}

      {/* ANIMATED */}
    <section className='homeVideoSection'>
      <video 
        autoPlay loop muted playsInline
        className="moleculeVideo"
      >
        <source src={moleculeVideo} type="video/mp4" />
      </video>
      
      <div className='containerPpal homeLogo animated'>
        <img src={logo} alt="Research Agora Logo" />
        <h1>
          <span>Discuss</span> 
          <span>Share</span> 
          <span>Collaborate</span>
        </h1>
        <p>Better research together</p>
        {!user &&
          <button 
          onClick={()=>navigate('/register')}
          className='homeJoinUs'
        >Join Us</button>}
      </div>
    </section>


    {/* <section className='whoWeAreSection'>
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
      </div>
    </section> */}

    </>
  )
}
