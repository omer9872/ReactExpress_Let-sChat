import React, {useState, useEffect} from 'react';
import '../style/sign.css'

export default function Sign(){

  const [username, setUsername] = useState('');

  useEffect(()=>{
    console.log(username);
  }, [username]);

  return (
    <div className="sign-container">
      <div className="form-container d-flex flex-column m-0 p-5">
        <h1>Welcome To <span className="badge bg-success">Let's Chat</span></h1>
        <input onChange={(e) => {setUsername(e.target.value)}} className="m-0 form-control" type="text" placeholder="Username..."></input>
        <a className="mt-3 btn btn-success text-white" href={"/welcome?username="+username}>Start to Chat!</a>
      </div>
    </div>
  );
}