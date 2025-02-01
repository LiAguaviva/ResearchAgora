import React, { useState, useEffect, useRef } from 'react';
import '../../pages/Chat/chat.css';
import x from '../../assets/icons/xDelete.svg';
 
export const ChatBox = ({ messages, sendMessage, inputText, setInputText, userId, deleteMessage, isSendDisabled }) => {
    const [hasNewMessages, setHasNewMessages] = useState(false);
    const [previousMessageCount, setPreviousMessageCount] = useState(0);
    const messagesContainerRef = useRef(null);
 
    useEffect(() => {
        if (messages.length > previousMessageCount) {
            setHasNewMessages(true);
            scrollToLastMessage();
        }
        setPreviousMessageCount(messages.length);
    }, [messages.length]);
 
    const scrollToLastMessage = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            setHasNewMessages(false);
        }
    };
 
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !isSendDisabled) {
            e.preventDefault();
            sendMessage();
        }
        scrollToLastMessage();
    };
 
    return (
        <div>
            <div className="messages" ref={messagesContainerRef}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message-content ${msg.sender_id === userId ? 'message-owner' : 'message-other'}`}
                    >
                        <p>{msg.message_content}</p>
                        {msg.sender_id === userId && (
                            <img
                                className='deleteMsgIcon'
                                src={x}
                                alt=" icon to delete message"
                                onClick={() => deleteMessage(msg.message_id)}
                            />
                        )}
                    </div>
                ))}
            </div>
 
            <div className="input-container">
                <input
                    type="text"
                    placeholder='Message'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="message-input"
                />
                <button  className='cancel' onClick={sendMessage} disabled={isSendDisabled}>Send</button>
            </div>
        </div>
    );
};
 