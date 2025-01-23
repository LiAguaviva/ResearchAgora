import { useRef } from 'react'
import './ScrollToTop.css'

export const ScrollToTop = ({scrollGoUp}) => {

  
  const scrollToTop = () => {
    scrollGoUp.current.scrollIntoView({behavior:'smooth'})
  }

  return (
    <button 
      className='scrollToTop'
      onClick={()=> scrollToTop()}
    >Top</button>
  )
}
