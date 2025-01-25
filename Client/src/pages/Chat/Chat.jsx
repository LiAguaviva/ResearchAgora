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
  const { user } = useContext(AgoraContext);
  const [currentReceiverId, setCurrentReceiverId] = useState(initialReceiverId);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
        if (user?.user_id && currentReceiverId) {
            try {
                const response = await fetchDataValidation(`http://localhost:4000/api/message/getmessages/${user.user_id}/${currentReceiverId}`, 'GET');
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

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    try {
      const payload = {
        sender_id: user.user_id,
        receiver_id: currentReceiverId,
        message_content: inputText
    };
      const response = await fetchDataValidation('http://localhost:4000/api/message/sendmessage', 'POST', payload);
      setMessages([...messages, response]); 
      setInputText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleUserClick = (userId) => {
    setCurrentReceiverId(userId);
};

  return (
    <>
      <ChatBox
                messages={messages}
                sendMessage={sendMessage}
                inputText={inputText}
                setInputText={setInputText}
                userId={user?.user_id}
            />
      <div>
       <ChatUsers currentUserId={user?.user_id} onUserClick={handleUserClick}/>
      </div>
    </>
    
  );
};
