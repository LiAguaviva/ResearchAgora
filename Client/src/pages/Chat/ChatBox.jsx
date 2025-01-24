import React from 'react';
import '../../pages/Chat/chat.css';

export const ChatBox = ({ messages, sendMessage, inputText, setInputText, userId }) => {
    return (
        <div>
            <div className="messages" style={{ width: '100%', overflow: 'auto', maxHeight: '400px' }}>
                {messages.map((msg, index) => (
                  <div style={{ 
                    backgroundColor: msg.sender_id === userId ? 'rgb(255, 162, 0)' : 'rgb(0, 190, 212)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '10px',
                    margin: '5px',
                    maxWidth: '80%', 
                }}>
                    <p key={index} >
                        {msg.message_content}
                    </p>
                  </div>
                    
                ))}
            </div>
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};
