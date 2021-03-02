import React, { useEffect, useState } from 'react';
import '../style/chat.css';
import socket from '../socket';
import { useHistory } from 'react-router-dom';

import Message from './Message';

export default function Chat(props) {

  let history = useHistory();
  const [username] = useState(history.location.search.split('=')[1]);
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);

  function sendMessage() {
    let messageData = { username: username, target: props.selectedUser, message: message, date: Date.now() };
    setMessages(messages => [...messages, messageData]);
    socket.emit('message', messageData);
    setMessage('');
  }

  useEffect(() => {
    socket.on('message', newMessage => {
      var updatedMessages = [...messages];
      updatedMessages.push(newMessage);
      setMessages(updatedMessages);
    })
  }, [messages]);

  return (
    <div className="chat-container col-9">
      <div className="chat-target">
        <p>Chatting With: <span className="badge bg-primary">{props.selectedUser}</span></p>
      </div>
      <div className="chat-message-container">
        {messages.map((message, index) => {
          if (props.selectedUser === message.target || (username === message.target && message.username === props.selectedUser)) {
            return <Message key={index} isMe={username === message.username ? true : false} date={message.date} message={message.message}></Message>;
          }
        })}
      </div>
      <div className="chat-input">
        <input disabled={props.selectedUser === 'Please Add/Select User' ? true : false} value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" placeholder={props.selectedUser === 'Please Add/Select User' ? "Please select user to start chat..." : "Type a message..."}></input>
        <button disabled={props.selectedUser === 'Please Add/Select User' ? true : false} onClick={() => sendMessage()} className="btn-send-message btn">Send</button>
      </div>
    </div>
  );
}