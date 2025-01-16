import React, { useContext } from 'react'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider'
import './ReviewCard.css'

export const ReviewCard = () => {

  const {user} = useContext(AgoraContext)

  return (
    <div>
      <div className='reviewCard'>
        <div className='user'>
              <div className='userCardAvatar'>
                <img 
                  className='userCardAvatar'
                  // src={user?.avatar? `${url}/images/users/${user.avatar}` :avatarDefault} 
                  src={avatarDefault}
                  alt="your avatar" 
                />
              </div>
      
              <div className='userCardData'>
              <p className='UserCardName'
              > {user?.user_name} {user?.user_lastname} name lastname</p>
              <p>profiency{user?.user_proficiency}</p>
              </div>
              </div>
              <div className='separator'></div>

              <div className='recomendation'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo iure a debitis doloremque tempore sed accusantium eos totam, voluptatum iste. Eos et perspiciatis est corrupti unde quibusdam laborum hic nemo fugiat, aut ullam repellat nobis qui molestiae blanditiis ut explicabo, iste dignissimos vitae ipsa possimus consectetur? Dolore nesciunt repellat ab quas totam, veniam, velit, ea beatae nobis repellendus est repudiandae molestias at ullam dolorem possimus cupiditate! Beatae repellendus voluptatibus vero voluptatem exercitationem quasi nostrum quam molestias, neque aut tenetur, dignissimos aliquam non blanditiis necessitatibus placeat rerum! Eligendi, animi, illum temporibus excepturi error nemo consequuntur doloremque culpa debitis ea sit libero vel at dolorum laborum nisi autem veritatis et. Fuga illo quia error blanditiis quidem fugiat omnis eaque consequuntur ut deserunt impedit dolore, delectus libero! Dolorem nulla tenetur exercitationem dolore. Aut suscipit et soluta vero adipisci velit veritatis ipsum eos, asperiores quam! Odit, iure! Est nobis ex rerum quis vel facilis!</p>
              </div>
            </div>  
    </div>
  )
}
