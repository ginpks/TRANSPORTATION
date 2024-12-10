const params = new URLSearchParams(window.location.search);
let user = document.querySelector('.current-user');
user.innerHTML = `${params.get('id')}`;
const sessionId = params.get('session_id');
const currentUserId = params.get('currentUserId');
const postOwnerId = params.get('postOwnerId');

// Connect to the WebSocket server 
const socket = io();

socket.on('connect', () => {
  console.log(`user ${currentUserId} connected`);
})

if (sessionId) {
  // joining the chatroom with corresponding sessionId
  socket.emit('joinSession', sessionId);

  // Function to send messages
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

    // send message user types back to the server
    fetch('/api/chat/messages', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json' 
      }, 
      body: JSON.stringify({ session_id: sessionId, 
        sender_id: currentUserId,
        receiver_id: postOwnerId, 
        message: messageToSend 
      }) 
    }) 
    .then(response => response.json()) 
    .then(data => { 
      if (data.success) { 
        console.log('Message stored in database:', data.data); 
      } else { 
        console.error('Failed to store message:', data.error); 
      } 
    }) 
    .catch(error => { 
      console.error('Error storing message:', error); 
    });
    socket.emit('sendMessage', { sessionId, message: messageToSend, senderId: currentUserId });
  }

  // adding event listers to input box and send button
  document.querySelector('.send-button').addEventListener('click', sendMessage);
  document.querySelector('#chatInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });

  // when a message is received back from the server (user you are chatting with)
  // create a received message element and display it in the chatbox
  socket.on('receiveMessage', (data) => {
    const { message, senderId } = data;

    if (senderId !== currentUserId) { // making sure the message you send is not sent back to you by checking your ID against the sender's ID.
      const inbox = document.querySelector('.inbox');
      const receivedMessageContainer = document.createElement('div');
      receivedMessageContainer.classList.add('received-message');
      const messageContent = document.createElement('p');
      messageContent.textContent = message;
      receivedMessageContainer.appendChild(messageContent);
      inbox.prepend(receivedMessageContainer);
    }
  });
}

// when a user clicks on a post, they are redirected to the chat page where the owner
// of said post is added to the list of chatters
document.addEventListener('DOMContentLoaded', () => {
   //fetch all userList from the back-end when the page is loaded 
   if (sessionId) {
    loadChatHistory(sessionId); // Load chat history for the current session
    fetch("http://localhost:3000/api/chat/userlist",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentUserId, postOwnerId }),
    }).then((response) => response.json())
      .then((result) => {
        if(result.success){
          //update html 
          const userList = result.data;
          const userListContainer = document.querySelector('.user-list-container');
          const selectedUserPic = document.getElementById("selected-user");
          const selectedUserName = document.getElementById("selected");
          userListContainer.innerHTML = "";
          selectedUserPic.textContent = postOwnerId.charAt(0).toUpperCase();
          selectedUserName.textContent = postOwnerId;
  
          userList.forEach((userName, index) => {
            const userElement = document.createElement("div");
            userElement.className = "user";
            userElement.setAttribute("id", userName);
  
            if (index === 0 && userName === postOwnerId) {
              userElement.classList.add("selected");
            }
  
            userElement.innerHTML = `
            <div class="user-pic">${userName.charAt(0).toUpperCase()}</div>
            <span class="user-name">${userName}</span>
          `;
            userElement.addEventListener("click", async () => {
              if (selectedUserName.textContent === userName) {
                console.log("User is already selected. No action needed.");
                return;
              }
              const target_sessionID = await getSession(currentUserId, userName);
              updateInteraction(target_sessionID);
              window.location.href = `/chat-page/index.html?session_id=${target_sessionID}&currentUserId=${currentUserId}&postOwnerId=${userName}`;
            });
            userListContainer.appendChild(userElement);
          });
        }else{
          console.error("Failed to fetch user list:", result.error);
        }
      }).catch((error)=> console.error("Error fetching user list:", error));
   }
});


async function getSession(currentUserId, postOwnerId) {
  try {
    const response = await fetch("http://localhost:3000/api/chat/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentUserId, postOwnerId }),
    });

    const result = await response.json();

    if (result.success) {
      return result.session_id; 
    } else {
      console.error("Failed to get session:", result.error);
      return null; 
    }
  } catch (error) {
    console.error("Error getting or creating session:", error);
    return null;
  }
}


// Function to load chat history
async function loadChatHistory(sessionId) {
  try {
    const response = await fetch(`http://localhost:3000/api/chat/messages/${sessionId}`, {
      method: "GET",
    });

    const result = await response.json();

    if (result.success) {
      const inbox = document.querySelector('.inbox');
      inbox.innerHTML = ""; 

      result.data.forEach((message) => {
        const messageContainer = document.createElement('div');

        if (message.sender_id === currentUserId) {
          // If the message is sent by the current user
          messageContainer.classList.add('sent-message');
        } else {
          // If the message is received
          messageContainer.classList.add('received-message');
        }
        const messageContent = document.createElement('p');
        messageContent.textContent = message.message; // Append the message text
        messageContainer.appendChild(messageContent);
        inbox.prepend(messageContainer); // Append to chat inbox
      });
    } else {
      console.error("Failed to load chat history:", result.error);
    }
  } catch (error) {
    console.error("Error fetching chat history:", error);
  }
}

async function updateInteraction(sessionId) {
  try {
    const response = await fetch("http://localhost:3000/api/chat/session/update-interaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_id: sessionId }),
    });

    const result = await response.json();

    if (result.success) {
      console.log(`Interaction for session ${sessionId} updated successfully.`);
      return true; 
    } else {
      console.error("Failed to update interaction:", result.error);
      return false; 
    }
  } catch (error) {
    console.error("Error updating interaction:", error);
    return false; 
  }
}

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


// // dynamically update the selected passenger when clicked
// document.addEventListener('DOMContentLoaded', () => {
//   // loadMessages(); //load message
//   // loadUserOrder();
//   const users = document.querySelectorAll(".user");
//   const selectedUser = document.getElementById("selected");
//   const selectedUserPic = document.getElementById("selected-user")
//   const userListContainerMobile = document.querySelector(".user-list-container-mobile");
//   const selectedPassenger = document.querySelector(".dropdown");

//   //behavior in user list container
//   const userList = document.querySelector(".user-list-container");

//   users.forEach(user => {

//     const userName = user.querySelector('span.user-name');
//     const userPic = user.querySelector('div.user-pic');

//     user.addEventListener('click', () => {
//       selectedUser.textContent = userName.textContent;
//       selectedUserPic.textContent = userPic.textContent;
//       userListContainerMobile.style.display = "none";

//       //behavior in user list container
//       userList.prepend(user);
//       users.forEach(others => {
//         others.classList.remove("selected");
//       });
//       user.classList.add("selected")
//       userList.scrollTo({
//         top:0,
//         behavior: 'smooth'
//       })
//       // saveUserOrder();
//     });
//   });

//   // Function to toggle dropdown functionality based on screen size
//   const handleDropdownForMobile = () => {
//     const isSmallScreen = window.matchMedia("(max-width: 950px)").matches;

//     if (isSmallScreen) {
//       // Add hover functionality for small screens
//       selectedPassenger.addEventListener('mouseenter', showDropdown);
//       selectedPassenger.addEventListener('mouseleave', hideDropdown);
//     } else {
//       // Remove hover functionality for larger screens
//       selectedPassenger.removeEventListener('mouseenter', showDropdown);
//       selectedPassenger.removeEventListener('mouseleave', hideDropdown);
//       userListContainerMobile.style.display = "none"; // Make sure it's hidden on large screens
//     }
//   };

//   // Functions to show and hide the dropdown
//   const showDropdown = () => {
//     userListContainerMobile.style.display = "block";
//   };

//   const hideDropdown = () => {
//     userListContainerMobile.style.display = "none";
//   };

//   // Initial check and set event listeners
//   handleDropdownForMobile();

//   // Re-check when the window is resized
//   window.addEventListener('resize', handleDropdownForMobile);
//   document.querySelector('.webLogo').addEventListener('click', ()=>{window.location.href = '../main-posts-page/index.html';})
// });




