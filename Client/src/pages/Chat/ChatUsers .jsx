import React, { useEffect, useState } from 'react';
import { fetchDataValidation } from '../../helpers/axiosHelper';
const url = import.meta.env.VITE_IMAGEPROVIDER_URL;
import avatarDefault from '../../assets/imgs/defaultIMG.png'

export const ChatUsers = ({ currentUserId, onUserClick  }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchChatUsers = async () => {
            try {
                const response = await fetchDataValidation(`http://localhost:4000/api/message/chatUsers/${currentUserId}`, 'GET');
                setUsers(response);
            } catch (error) {
                console.error("Failed to fetch chat users:", error);
            }
        };
        fetchChatUsers();
    }, [currentUserId]);

    return (
        <div className="users-list">
            {users.map(user => (
                <div 
                    key={user.user_id} 
                    className={`user-item ${currentUserId === user.user_id ? 'active-user' : ''}`}
                    onClick={() => onUserClick(user.user_id)}>
                   <img 
                      className='profileAvatar'
                      src={user?.user_avatar? `${url}/useravatar/${user.user_avatar}` : avatarDefault} 
                      alt="profile picture" 
                    />
                    <p>{user.user_name} {user.user_lastname}</p>
                </div>
            ))}
        </div>
    );
};
