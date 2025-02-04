import React from 'react'
import partnershipImg from '../../assets/imgs/partnership_1_p.jpg'
    


export const Partnership = () => {
  return (
    <>
    <section className='infoContainer'>
      <div className='textContainer text'>
        <h4>Partnerships</h4>
        <p>
          We are currently collaborating with these companies and platforms. Do you want to start a partnership with us? Write to us at partner@researchagora.com
        </p>
      </div>
      <img src={partnershipImg} alt="" className='infoImg'/>
    </section>
    </>
  )
}
