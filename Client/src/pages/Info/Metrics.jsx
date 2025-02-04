import React from 'react'
import metricsImg from '../../assets/imgs/metrics_1.jpg'


export const Metrics = () => {
  return (
    <>
    <section className='infoContainer'>
      <div className='textContainer text'>
      <h4>Metrics Disclosure</h4>
      <p>
      We offer traditional metrics on research as well as our own. However we firmly believe in that these metrics are only orientative and are NOT a substitute of quality assessment by peer-review (which is also possible in the platform).
      </p>
      <p>
      Here is a description of how our metrics are calculated and which sources we use to extract this information. 
      </p>
      <p>
      Are your metrics not correct? Please let us know here.
      </p>
      </div>
      <img src={metricsImg} alt="" className='infoImg'/>

    </section>
    </>
  )
}
