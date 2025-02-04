import React from 'react'
import contactImg from '../../assets/imgs/contact.jpg'


export const Contact = () => {
  return (
    <>
    <section className='infoContainer'>
      <div className='textContainer text'>
        <h4>Contact</h4>
        <p>
          Do you have any questions? Please contact us at info@researchagora.com
        </p>
      </div>
      <img src={contactImg} alt="" className='infoImg' />
    </section>
    </>
  )
}
