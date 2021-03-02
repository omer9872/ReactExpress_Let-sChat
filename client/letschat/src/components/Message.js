import React, { useEffect, useState } from 'react';
import '../style/message.css';

export default function Message(props) {

  const [date, setDate] = useState(props.date);

  useEffect(() => {
    var d = new Date(props.date);
    var parsedDate = d.getHours() + ":" + d.getMinutes();
    setDate(parsedDate)
  }, [props.date]);

  return (
    <div className="message-container" style={{ justifyContent: props.isMe === true ? 'flex-end' : 'flex-start' }}>
      <div style={{ display: props.isMe === true ? 'none' : 'flex' }} className="incoming">
        <div className='date-text-container'>
          <p className='date-text'>{date}</p>
        </div>
        <div className='message-text-container'>
          <p>{props.message}</p>
        </div>
      </div>
      <div style={{ display: props.isMe === true ? 'flex' : 'none' }} className="outgoing">
        <div className='date-text-container'>
          <p className='date-text'>{date}</p>
        </div>
        <div className='message-text-container'>
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  );
}