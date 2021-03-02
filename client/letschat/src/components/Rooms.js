import React, { useState, useEffect } from 'react';
import '../style/rooms.css';
import socket from '../socket';
import User from './User';

export default function Rooms(props) {

  const [users, setUsers] = useState([]);
  const [popup, setPopup] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const openPopup = function () {
    setPopup(true);
  }
  const closePopup = function () {
    setPopup(false);
  }
  const addUser = function () {
    setUsers(users => [...users, newUsername]);
    closePopup();
  }
  const selectUser = function (username) {
    props.updateSelectedUser(username);
  }

  useEffect(() => {
    socket.on('message', newMessage => {
      if (users.length === 0) {
        var updatedUsers = [...users];
        updatedUsers.push(newMessage.username);
        setUsers(updatedUsers);
      } else {
        let user = users.find(u => {
          return u === newMessage.username;
        });
        if (!user) {
          var updatedUsers = [...users];
          updatedUsers.push(newMessage.username);
          setUsers(updatedUsers);
        }
      }
    })
  }, [users]);

  return (
    <div className="rooms-container col-3">
      <div className="caption-place">
        <div className="caption-btn-container">
          <p>Current Chats</p>
          <button onClick={() => openPopup()} className="btn btn-outline-success">Add</button>
        </div>
        <div className="mt-2 border"></div>
      </div>
      <div className="users">
        {users.map((user, index) => {
          return <User selectUser={selectUser} key={index} username={user}></User>
        })}
      </div>

      {popup ?
        <div className="popup">
          <div className="form-contanier">
            <p>Please Enter Username</p>
            <input onChange={(e) => { setNewUsername(e.target.value) }} type="text" placeholder="Username..."></input>
            <button onClick={() => addUser()} className="btn btn-success">Add User</button>
            <button onClick={() => closePopup()} className="btn btn-danger">Cancel</button>
          </div>
        </div> :
        null
      }

    </div>
  );
}