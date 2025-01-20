import React, { useContext } from 'react'
import './ProjectInfoCard.css'
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;
import projectDefaultIMG from '../../assets/imgs/defaultIMG.png'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider';


export const ProjectInfoCard = () => {

  const {user, project} = useContext(AgoraContext)
  
  return (
    <section className='projectInfoCard'>
      <h2>Project Title. Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
      <div>
        <div className="statusState">
          <p>Status</p>
          <p>State</p>
        </div>
        <div className="separatorThick" />
      </div>
      
      <div className="projectData" >
        <img 
          className='projectImg'
          src={project?.project_image? `${url}/projectImage/${project.project_image}` : projectDefaultIMG} 
          alt="your avatar" 
        />

        <div className="data">
          <div className="userCard">
            <div className="userCardAvatar">
              <img 
                className='userCardAvatar'
                src={user?.user_avatar? `${url}/useravatar/${user.user_avatar}` : avatarDefault} 
                alt="your avatar" 
              />
            </div>
    
            <div className="userCardData">
              <p className="UserCardName"
              > {user?.user_name} {user?.user_lastname}</p>
              <p>profiency{user?.user_proficiency}</p>
            </div>
          </div> 
          
          <div className='description'>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu</p>
          </div>
        </div>

      </div>
    </section>
  )
}
