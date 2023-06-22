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

    users.push(user);

    console.log('users', users)

  })

  socket.on('message', (message) => { 
  
  messages.push(message);
  
  socket.broadcast.emit('message', message);

  });

  socket.on('disconnect', () => { 
    
    const user = users.find(user => user.id === socket.id );
  
    if (user) {
      const userIndex = users.indexOf(user)
      users.splice(userIndex, 1);
      socket.broadcast.emit('message', {author: 'ChatBot', content: user.author + ' has left'});
  }
});
});
 