import React, { useContext } from 'react'
import { AgoraContext } from '../../context/ContextProvider'
import projectDefaultIMG from '../../assets/imgs/lab1.jpg'
import './AllProjectsCard.css'

export const AllProjectsCard = () => {

  const {user, project} = useContext(AgoraContext)

  return (
    <div className='AllProjectsCard'>
          <h4 className='projectTitle'>project Title Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo.</h4>
      <div className='data'>
       <div className='profileProjectImg'>
          <img 
            className='profileProjectImg'
            src={user?.project? `${url}/images/users/${user.avatar}` :projectDefaultIMG} 
            alt="your avatar" 
          />
        </div>

        <div className='info'>
          <p className='Creator'>Creator Name</p>
          <div className='tagsContainer'>
            <div className='tag'>js</div>
            <div className='tag'>react</div>
            <div className='tag'>css</div>
            <div className='tag'>dataanalysis</div>
            <div className='tag'>node</div>
          </div>
          <p className='Status'>Estado</p>

          <div className='description'>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis.
            </p>
          </div>
        </div>
        </div>
    </div>
  )
}
