import React from 'react';
import '../../pages/Chat/chat.css';

export const ChatBox = ({ messages, sendMessage , inputText, setInputText, userId , deleteMessage }) => {
    return (
        <div className="">
            <div className="messages" >
                {messages.map((msg, index) => (
                  <div key={index} className={`message-content ${msg.sender_id === userId ? 'message-owner' : 'message-other'}`} >
                    <p  >
                        {msg.message_content}
                        {msg.sender_id === userId && (
                            <span className="delete-btn" onClick={() => deleteMessage(msg.message_id)}>
                                ×
                            </span>
                        )}
                    </p>
                  </div>
                    
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder='Message'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="message-input"
                />
                <button  className='cancel' onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};
