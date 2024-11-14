
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
let user = document.querySelector('.current-user');

user.innerHTML = `${params.get('id')}`;

// dynamically update the selected passenger when clicked
document.addEventListener('DOMContentLoaded', () => {

  const users = document.querySelectorAll(".user");
  const selectedUser = document.getElementById("selected");
  const selectedUserPic = document.getElementById("selected-user")
  const userListContainerMobile = document.querySelector(".user-list-container-mobile");
  const selectedPassenger = document.querySelector(".dropdown");

  users.forEach(user => {

    const userName = user.querySelector('span.user-name');
    const userPic = user.querySelector('div.user-pic');

    user.addEventListener('click', () => {
      selectedUser.textContent = userName.textContent;
      selectedUserPic.textContent = userPic.textContent;
      userListContainerMobile.style.display = "none";
    });
  });

  // Function to toggle dropdown functionality based on screen size
  const handleDropdownForMobile = () => {
    const isSmallScreen = window.matchMedia("(max-width: 950px)").matches;

    if (isSmallScreen) {
      // Add hover functionality for small screens
      selectedPassenger.addEventListener('mouseenter', showDropdown);
      selectedPassenger.addEventListener('mouseleave', hideDropdown);
    } else {
      // Remove hover functionality for larger screens
      selectedPassenger.removeEventListener('mouseenter', showDropdown);
      selectedPassenger.removeEventListener('mouseleave', hideDropdown);
      userListContainerMobile.style.display = "none"; // Make sure it's hidden on large screens
    }
  };

  // Functions to show and hide the dropdown
  const showDropdown = () => {
    userListContainerMobile.style.display = "block";
  };

  const hideDropdown = () => {
    userListContainerMobile.style.display = "none";
  };

  // Initial check and set event listeners
  handleDropdownForMobile();

  // Re-check when the window is resized
  window.addEventListener('resize', handleDropdownForMobile);
  document.querySelector('.webLogo').addEventListener('click', ()=>{window.location.href = '../main-posts-page/index.html';})
});
