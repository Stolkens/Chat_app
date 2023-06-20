
let userName = '';
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const login = (e) => {
  e.preventDefault()
  if (userNameInput.value === '') {
    alert('field userName cannot be empty')
  }
  else {
    userName = userNameInput.value;
    console.log(userName);
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

const joinButton = document.getElementById('join');
joinButton.addEventListener('click', login);

const addMessage = (messageAuthor, messageContent ) => {
  const message = document.createElement('li');
  message.classList.add('message', 'message--received');
  if (messageAuthor === userName) {
    message.classList.add('message--self');
    message.innerHTML = `<h3 class="message__author">You</h3><div class="message__content">${messageContent}</div>`;
    messagesList.appendChild(message);
  }
};
  
const sendMessage = (e) => {
  e.preventDefault();
  if(messageContentInput.value === '') {
    alert('field message cannot be empty')
  }
  else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
}

const sendButton = document.getElementById('send');
sendButton.addEventListener('click', sendMessage);
