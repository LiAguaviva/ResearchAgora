import { useRef } from 'react'
import arrowup from '../../../assets/icons/arrowUp-circle.svg'
import './ScrollToTop.css'

export const ScrollToTop = ({scrollGoUp}) => {

  
  const scrollToTop = () => {
    scrollGoUp.current.scrollIntoView({behavior:'smooth'})
  }

  return (
    <img 
      className='scrollToTop'
      onClick={()=> scrollToTop()}
      src={arrowup} alt="" 
    />
  )
}
