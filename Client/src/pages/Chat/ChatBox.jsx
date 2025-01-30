import React from 'react';
import '../../pages/Chat/chat.css';
import x from '../../assets/icons/xDelete.svg'

export const ChatBox = ({ messages, sendMessage , inputText, setInputText, userId , deleteMessage ,isSendDisabled}) => {
    return (
        <div>
            <div className="messages" >
                {messages.map((msg, index) => (
                  <>
                  <div 
                    key={index} 
                    className={`message-content ${msg.sender_id === userId ? 
                    'message-owner' : 'message-other'}`} 
                  >
                    <p>
                        {msg.message_content}
                    </p>
                        {/* {msg.sender_id === userId && (
                            <span className="delete-btn" onClick={() => deleteMessage(msg.message_id)}>
                                ×
                            </span>
                        )} */}
                        {msg.sender_id === userId && (
                            <img 
                                className='deleteMsgIcon'
                                src={x} alt="" 
                                onClick={() => deleteMessage(msg.message_id)}
                            />
                        )}
                    </div>
                  </>
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
                <button  className='cancel' onClick={sendMessage} disabled={isSendDisabled}>Send</button>
            </div>
        </div>
    );
};
