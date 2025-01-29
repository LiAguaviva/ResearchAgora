import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AgoraContext } from '../../context/ContextProvider';
import { fetchData2, fetchDataValidation } from '../../helpers/axiosHelper';
import { ChatUsers } from './ChatUsers ';
import { ChatBox } from './ChatBox';
import './chat.css';


export const Chat = () => {
  const { receiver_id } = useParams();
  const initialReceiverId = Number(receiver_id);
  /* const final_receiver_id = Number(receiver_id); */
  const { user , setNotifications,token} = useContext(AgoraContext);
  const [currentReceiverId, setCurrentReceiverId] = useState(initialReceiverId);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
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
    fetchMessages();
}, [currentReceiverId, user?.user_id]);


/*   const fetchMessages = async () => {
    try {
      const response = await fetchDataValidation(`http://localhost:4000/api/message/getmessages/${user.user_id}/${final_receiver_id}`, 'GET');
      console.log("all messages",response);
      
      
      setMessages(response);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }; */

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
        /* setMessages([...messages, response]); 
        setInputText(""); */
        /* setTimeout(() => {
          window.location.reload()
      }, 1); */
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };
  }
  const handleUserClick = (userId) => {
    setCurrentReceiverId(userId);
  };

  const deleteMessage = async (messageId) => {
    try {
        await fetchDataValidation(`http://localhost:4000/api/message/deletemessage`, 'DELETE', { message_id: messageId });
        setMessages(messages => messages.filter(msg => msg.message_id !== messageId));
    } catch (error) {
        console.error("Failed to delete message:", error);
    }
  };
  const isSendDisabled = user?.user_id === currentReceiverId;
return (
  <section className='chatSection containerPpal'>
  <div className="chat-container">
    <div className="chat-user">
      <ChatUsers currentUserId={user?.user_id} onUserClick={handleUserClick} token={token}/>
    </div>
    <div className="chat-box-container">
      <ChatBox
          messages={messages}
          sendMessage={sendMessage}
          inputText={inputText}
          setInputText={setInputText}
          userId={user?.user_id}
          deleteMessage={deleteMessage}
          isSendDisabled={isSendDisabled}
      />
    </div>
  </div>
  </section>
  );
};
