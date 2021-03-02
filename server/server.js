const rooms = [];
const users = [];

const http = require('http');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { Socket } = require('socket.io');
require('dotenv').config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

server.listen(process.env.SERVER_PORT, _ => {
  console.log(`Server running at port: ${process.env.SERVER_PORT}`);
});

app.get('/createroom', (req, res) => {
  res.send(uuidv4());
});

io.on("connection", (socket) => {
  console.log('New Connection!');

  socket.on('newuser', (args) => {
    if (users.length > 0) {
      let userIndex = -1;
      for (let index = 0; index < users.length; index++) {
        if (users[index].username === args.username) {
          userIndex = index;
        }
      }
      if (userIndex !== -1) {
        users[userIndex].socketId = socket.id;
      } else {
        let user = { username: args.username, socketId: socket.id };
        users.push(user);
      }
    } else {
      let user = { username: args.username, socketId: socket.id };
      users.push(user);
    }
    console.log('All Users:', users);
  })

  socket.on('message', (args) => {
    args.date = Date.now();
    console.log('New Message: ', args);
    let user = users.find((user) => {
      return user.username === args.target;
    })
    if (user) {
      io.to(user.socketId).emit('message', args);
    }
  })

  socket.on('disconnect', (args) => {
    console.log('Disconnected User: ', socket.id);
    let delIndex = -1;
    for (let index = 0; index < users.length; index++) {
      if (users[index].socketId === socket.id) {
        delIndex = index;
        break;
      }
    }
    if (delIndex >= 0) {
      users.splice(delIndex, 1);
      console.log('All Users:', users);
    }
  })
});