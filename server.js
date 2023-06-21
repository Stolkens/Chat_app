const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
let users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('user', (user) => {

    users.push( user );
    console.log('users', users)
    console.log('user.id',user.id)
    console.log('socket.id', socket.id)
  })

  socket.on('message', (message) => { 
  
  messages.push(message);
  console.log('messages', messages)
  
  socket.broadcast.emit('message', message);

  });

  console.log('users', users)

  socket.on('disconnect', () => 
  { console.log('Oh, socket ' + socket.id + ' has left') });
  console.log(users.findIndex(user => user.id === socket.id ))
  const userIndex = users.findIndex(user => user.id === socket.id );
  
  
  console.log('userIndex',userIndex)
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    console.log('users koncowe', users);
  }
  
});
 