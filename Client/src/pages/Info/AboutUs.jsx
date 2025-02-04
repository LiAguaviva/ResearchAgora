import React from 'react'
import aboutImg from '../../assets/imgs/about.png'

export const AboutUs = () => {
  return (
    <>
    <section className='infoContainer'>
      <div className='textContainer'>
        {/* <div className='text'> */}
          <div className='text'>
            <h4>About Us</h4>
            <p>
              At Research Agora, we believe that a change in how research is shared and assessed must take place. New research assessment agreements like DORA and CoARA advocate for a more open and collaborative research culture that takes into account all research outputs, from publications to science outreach and open science policies.
            </p>
            <p>
            We aim to provide a platform that will help you showcase your achievements as a researcher, but also to provide a forum to share your research, initiate collaborations and create an active community in which research integrity and reproducibility are the core values.
            </p>
                    </div>
          </div>

        <div className='text'>
          <h4>Our Priority</h4>
          <p>
          Our platform is continuously evolving and new functionalities are developed in close collaboration with researchers worldwide. Our objective is to tailor the platform to the evolving needs of the research community. 
          </p>
        {/* </div> */}
      </div>
      <img src={aboutImg} alt="" className='infoImg'/>
    </section>
    </>
  )
}
