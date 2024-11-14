
const params = new URLSearchParams(window.location.search);
// **FOLLOWING CODE IS FOR DEMONSTRATIONAL PURPOSES ONLY**

// creates a message element and prepends it the inbox.
function sendMessage() { 
  const inbox = document.querySelector('.inbox');
  const chatInput = document.querySelector('#chatInput');
  const messageToSend = chatInput.value;
  if (messageToSend === "") {
    return;
  }
  chatInput.value = "";
  const sendMessageContainer = document.createElement('div');
  sendMessageContainer.classList.add('sent-message');
  const messageContent = document.createElement('p');
  messageContent.textContent = messageToSend;
  sendMessageContainer.appendChild(messageContent);
  inbox.prepend(sendMessageContainer);
}

// adding event listers to input box and send button
document.querySelector('.send-button').addEventListener('click', sendMessage)
document.querySelector('#chatInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

//search function
const searchInput = document.querySelector('#searchInput'); 
const userList = document.querySelector('.user-list-container');
searchInput.addEventListener('input',function(){
  const token = searchInput.value.toLowerCase();
  const users = userList.querySelectorAll('.user');
  users.forEach((user) => {
    const userName = user.querySelector('.user-name').textContent.toLowerCase();
    if(userName.includes(token)){
      user.style.display = '';
    }else{
      user.style.display = 'none';
    }
  })
});



//The following code is for real dynamic purpose
let user = document.querySelector('#current-user');

user.innerHTML = `${params.get('id')}`;