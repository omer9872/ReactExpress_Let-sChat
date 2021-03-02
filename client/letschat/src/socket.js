import { io } from "socket.io-client";
const socket = io("http://192.168.1.43:4000");
socket.on('connect', _ => {
  console.log(socket.id);
});
export default socket;