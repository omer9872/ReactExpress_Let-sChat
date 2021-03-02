import React from 'react';
import '../style/user.css';

export default function User(props){
  return(
    <button onClick={() => props.selectUser(props.username)} className="user-container btn">
      <p>{props.username}</p>
    </button>
  );
}