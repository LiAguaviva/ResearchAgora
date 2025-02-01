import React, { useEffect, useState } from 'react';
import { fetchData2 } from '../../helpers/axiosHelper';
const urlImg = import.meta.env.VITE_IMAGEPROVIDER_URL;
import avatarDefault from '../../assets/imgs/defaultIMG.png'

export const ChatUsers = ({ currentUserId, onUserClick,token, currentReceiverId  }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchChatUsers = async () => {
            try {
                const response = await fetchData2(`message/chatUsers/${currentUserId}`, 'GET',null,  { Authorization: `Bearer ${token}` });
                setUsers(response);
            } catch (error) {
                console.error("Failed to fetch chat users:", error);
            }
        };
        fetchChatUsers();
    }, [currentUserId, currentReceiverId]);

    // console.log('currentUserId', currentUserId);
    console.log('users', users);


    return (
        <div className="users-list">
            {users.map(user => (
                <div key={user.user_id}  >
                <div 
                  className={`user-item ${currentReceiverId === user.user_id ? 'active-user' : ''}`}
                  onClick={() => onUserClick(user.user_id)}
                >
                    <img 
                      className='profileAvatar'
                      src={user?.user_avatar? `${urlImg}/useravatar/${user.user_avatar}` : avatarDefault} 
                      alt="profile picture" 
                    />
                    <p>{user.user_name} {user.user_lastname}</p>
                </div>
                <div className='separatorChat' />
                </div>
            ))}
        </div>
    );
};
