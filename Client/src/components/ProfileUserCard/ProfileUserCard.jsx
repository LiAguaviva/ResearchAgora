import React, { useContext } from 'react'
import avatarDefault from '../../assets/imgs/defaultIMG.png'
import { AgoraContext } from '../../context/ContextProvider'
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;
import './ProfileUserCard.css'
import { useNavigate } from 'react-router-dom';

export const ProfileUserCard = () => {

  const {user} = useContext(AgoraContext)
  const navigate = useNavigate();

  return (
    <div className='profileUserCard'>

      <div className='profileUserHeader'>
        <div className='profileAvatar'>
          <img 
          className='profileAvatar'
            src={user?.user_avatar? `${url}/useravatar/${user.user_avatar}` : avatarDefault} 
            alt="your avatar" 
          />
        </div>

        <div className='userCardHeadData'>
        <h3 className='profileUserName'
        > {user?.user_name} {user?.user_lastname}</h3>
        <p>Fields: 
        {/* {fields?.map((elem, key)=>{
          return(
            {elem}
          )
        })} */}
        </p>
        <p>profiency{user?.user_proficiency}</p>
        <button onClick={() => navigate('/editProfile')}>EDIT</button>

        </div>
      </div>  

      <div className='separator'></div>

      <div className='profileDescription'>
      <p>{user?.user_description}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui perspiciatis tenetur eius. Aperiam, quaerat! Illum quis in laudantium nemo iusto, odio omnis alias, officiis facilis accusantium, est necessitatibus eveniet perspiciatis ullam. Voluptatem suscipit praesentium sint nesciunt asperiores impedit quas laboriosam! Aliquam maiores itaque, minima mollitia dolores a porro quos! Distinctio quasi deserunt, sit corrupti soluta illo enim repudiandae neque in maiores! Impedit vitae quos facilis id quaerat voluptates hic expedita. Quae cupiditate deleniti quam, dignissimos unde natus sequi tempora maxime debitis temporibus nam harum delectus id pariatur deserunt possimus consequatur totam nobis dolor at, dolores libero omnis ducimus. Nobis obcaecati nesciunt placeat voluptatibus aspernatur distinctio, quos sunt nihil repellendus ab odit quasi illo odio tempore cupiditate ex assumenda animi deserunt inventore provident delectus. Ab, culpa enim pariatur, esse quasi, veniam dolorem est animi harum ipsum dolores officiis doloremque accusantium sunt similique minus iste quae dolorum inventore ipsa qui deleniti? Cupiditate asperiores recusandae, modi repellendus beatae nam, sunt omnis perspiciatis nostrum, labore doloremque praesentium quas vitae corrupti molestiae a voluptatem aperiam! Ipsa ex necessitatibus veniam alias consequuntur earum quasi nobis totam adipisci cupiditate. Distinctio quia nulla, esse atque aliquid, excepturi vitae quis debitis doloribus dolore ut? Maiores possimus molestiae hic nesciunt error adipisci corporis repellendus officiis voluptas necessitatibus ducimus impedit aliquam vitae obcaecati porro nostrum odit doloribus distinctio laboriosam, excepturi dolor ipsum. Accusantium natus vero vitae? Quas nostrum ipsa error ipsam voluptates, itaque amet quis! Et in consequatur, eligendi, vel ex provident magnam facilis dolores, nihil voluptate accusantium soluta error reiciendis?
      </p>
      </div>

    </div>
  )
}
