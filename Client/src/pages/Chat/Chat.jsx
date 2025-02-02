import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AgoraContext } from '../../context/ContextProvider';
import { fetchData2 } from '../../helpers/axiosHelper';
import { ChatUsers } from './ChatUsers ';
import { ChatBox } from './ChatBox';
import './chat.css';
import arrowUpDown from '../../assets/icons/arrow-upDown.svg'


export const Chat = () => {
  const { receiver_id } = useParams();
  const initialReceiverId = Number(receiver_id);
  /* const final_receiver_id = Number(receiver_id); */
  const { user, setNotifications, token} = useContext(AgoraContext);
  const [currentReceiverId, setCurrentReceiverId] = useState(initialReceiverId);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [seeUsers, setSeeUsers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(1000)

  useEffect(() => {
 
    const interval = setInterval(() => {
      fetchMessages();
      setLoading(false)
    }, time);
   
    return () => clearInterval(interval);
  }, [currentReceiverId, user?.user_id,messages]);
  
  const fetchMessages = async () => {
      if (user?.user_id && currentReceiverId && user.user_id !== currentReceiverId) {
          try {
              const response = await fetchData2(`message/getmessages/${user.user_id}/${currentReceiverId}`, 'GET',null,  { Authorization: `Bearer ${token}` });
              setMessages(response);
          } catch (error) {
              console.error("Failed to fetch messages:", error);
          }
      }
  };


  useEffect(() => {
    const markAllMessageNotificationsAsRead = async () => {
      if (user?.user_id) {
        try {
          await fetchData2(
            `notification/markMessageNotificationsAsRead`,
            'PUT',
            { user_id: user.user_id },
            { Authorization: `Bearer ${token}` }
          );
          setNotifications((prev) => prev.filter((notif) => notif.type !== 1));
        } catch (error) {
          console.error("Failed to mark message notifications as read:", error);
        }
      }
    };

    markAllMessageNotificationsAsRead();
  }, [user?.user_id, setNotifications]);

  useEffect(() => {
    setTime(1000)
  }, [loading])

  const sendMessage = async () => {
    if (inputText.trim()){
      const newMessage = {
        sender_id: user.user_id,
        receiver_id: currentReceiverId,
        message_content: inputText
      };
      setMessages(currentMessages => [...currentMessages, newMessage]);
      setInputText("");
      try {
        const payload = {
          sender_id: user.user_id,
          receiver_id: currentReceiverId,
          message_content: inputText
      };
        const response = await fetchData2('message/sendmessage', 'POST', payload, { Authorization: `Bearer ${token}` });


      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };
  }
  
  const handleUserClick = (userId) => {
    setCurrentReceiverId(userId);
    setLoading(true)
    setTime(400)
  };

  const deleteMessage = async (messageId) => {
    try {
        await fetchData2(`message/deletemessage`, 'DELETE', { message_id: messageId },
         {Authorization: `Bearer ${token}` }
        );
        setMessages(messages => messages.filter(msg => msg.message_id !== messageId));
    } catch (error) {
        console.error("Failed to delete message:", error);
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 700) {
      setSeeUsers(false);
    } else {
      setSeeUsers(true);
    }
  };

  useEffect(() => {
    handleResize()
  }, [window.addEventListener('resize', handleResize)]);

  const isSendDisabled = user?.user_id === currentReceiverId;

 
  return (

      <section className='chatSection containerPpal'>
        <div className='usersListContainer'>
        <button 
          onClick={()=> setSeeUsers(!seeUsers)}
          className='seeUsersChatButton'
        >your chats
        <img 
          src={arrowUpDown} 
          alt="arrow to open and hide your chats" 
        />
        </button>
        
          {seeUsers && 
            <ChatUsers 
              currentUserId={user?.user_id} 
              onUserClick={handleUserClick} 
              token={token}
              currentReceiverId={currentReceiverId}
            /> }
        </div>

          
        <div className="chat-box-container">
        {loading ? (
            <p className="loading-text">Loading messages...</p>
          ) : (
            <ChatBox
              messages={messages}
              sendMessage={sendMessage}
              inputText={inputText}
              setInputText={setInputText}
              userId={user?.user_id}
              deleteMessage={deleteMessage}
            />
          )}
        </div>
      </section>
    );
};
