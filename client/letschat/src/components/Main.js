import React, {useEffect, useState} from 'react';
import socket from '../socket';
import { useHistory } from "react-router-dom";
import '../style/main.css';

import Rooms from './Rooms';
import Chat from './Chat';

export default function Main(props){

  let history = useHistory();
  const [selectedUser, setSelectedUser] = useState('Please Add/Select User');

  const updateSelectedUser = function(username){
    setSelectedUser(username);
  }

  useEffect(() => {
    let username = history.location.search.split('=')[1];
    socket.emit('newuser', { username:username })
  }, []);

  return(
    <div className='main-container'>
      <div className='component-container col-10'>
        <Rooms updateSelectedUser={updateSelectedUser} ></Rooms>
        <Chat selectedUser={selectedUser} ></Chat>
      </div>
    </div>
  );
}