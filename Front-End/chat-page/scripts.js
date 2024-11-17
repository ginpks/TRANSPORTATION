
const params = new URLSearchParams(window.location.search);
let user = document.querySelector('.current-user');
user.innerHTML = `${params.get('id')}`;
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

  //store the message into database 
  openDatabase().then((db) => {
    const transaction = db.transaction("messages", "readwrite");
    const store = transaction.objectStore("messages");
    const message = {
        content: messageToSend,
        timestamp: Date.now(),
        senderId: "currentUserId",  // Replace with actual current user ID
        receiverId: "otherUserId"   // Replace with actual recipient ID
    };
    store.add(message);
  }).catch((error) => {
    console.error("Error saving message:", error);
  });
}

// adding event listers to input box and send button
document.querySelector('.send-button').addEventListener('click', sendMessage);
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

// dynamically update the selected passenger when clicked
document.addEventListener('DOMContentLoaded', () => {
  loadMessages(); //load message
  loadUserOrder();
  const users = document.querySelectorAll(".user");
  const selectedUser = document.getElementById("selected");
  const selectedUserPic = document.getElementById("selected-user")
  const userListContainerMobile = document.querySelector(".user-list-container-mobile");
  const selectedPassenger = document.querySelector(".dropdown");

  //behavior in user list container
  const userList = document.querySelector(".user-list-container");

  users.forEach(user => {

    const userName = user.querySelector('span.user-name');
    const userPic = user.querySelector('div.user-pic');

    user.addEventListener('click', () => {
      selectedUser.textContent = userName.textContent;
      selectedUserPic.textContent = userPic.textContent;
      userListContainerMobile.style.display = "none";

      //behavior in user list container
      userList.prepend(user);
      users.forEach(others => {
        others.classList.remove("selected");
      });
      user.classList.add("selected")
      userList.scrollTo({
        top:0,
        behavior: 'smooth'
      })
      saveUserOrder();
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

//Setting Up database for Chatpage
export function openMessageDatabase() {
  return new Promise((resolve, reject) => {
      console.log("trying to open database...");
      let db;
      const request = indexedDB.open('chatDatabase', 1);
      
      request.onupgradeneeded = (event) => {
          console.log("database upgrading...");
          db = event.target.result;
          if (!db.objectStoreNames.contains('messages')) {
            const store = db.createObjectStore("messages", { keyPath: "id", autoIncrement: true });
            store.createIndex("timestamp", "timestamp", { unique: false }); // For ordering by time
            store.createIndex("senderId", "senderId", { unique: false });   // For querying by sender
            store.createIndex("receiverId", "receiverId", { unique: false }); // For querying by receiver
        };
      };
      request.onsuccess = (event) => {
          console.log("open database successfully");
          resolve(event.target.result);
      };
      request.onerror = (event) => {
          reject('Error opening IndexedDB: ' + event.target.errorCode);
      };
  });
}

function loadMessages(){
  openMessageDatabase().then((db)=>{
    const transaction = db.transaction("messages", "readonly");
    const store = transaction.objectStore("messages");
    const inbox = document.querySelector('.inbox');
    // inbox.innerHTML = "";  // Clear previous messages
    const request = store.openCursor();
    request.onsuccess = (event) =>{
      const cursor = event.target.result;
      if(cursor){
        const messageData = cursor.value;
        // Display each message
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('sent-message');
        const messageContent = document.createElement('p');
        messageContent.textContent = messageData.content;
        messageContainer.appendChild(messageContent);
        inbox.prepend(messageContainer);
        cursor.continue();
      }
    }
    request.onerror = (event) => {
      console.error("Error loading messages:", event.target.errorCode);
     };
  }).catch((error) => {
      console.error("Error opening database:", error);
  })
}

//Setting up database for user-list 
function openUserListDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("userListDatabase", 1);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("userOrder")) {
        db.createObjectStore("userOrder", { keyPath: "id" });
      }
    };
    request.onsuccess = event => {
      resolve(event.target.result);
    };
    request.onerror = event => {
      reject("Error opening user order database: " + event.target.errorCode);
    };
  });
}

function saveUserOrder() {
  const userListContainer = document.querySelector('.user-list-container');
  const users = userListContainer.querySelectorAll('.user');
  const userOrder = Array.from(users).map(user => user.getAttribute('id')); // Collect user IDs in order
  openUserListDatabase().then(db => {
    const transaction = db.transaction("userOrder", "readwrite");
    const store = transaction.objectStore("userOrder");
    const orderData = { id: "order", order: userOrder };
    store.put(orderData);
  }).catch(error => {
    console.error("Error saving user order:", error);
  });
}

function loadUserOrder() {
  openUserListDatabase().then(db => {
    const transaction = db.transaction("userOrder", "readonly");
    const store = transaction.objectStore("userOrder");

    const request = store.get("order");
    request.onsuccess = event => {
      const savedOrder = event.target.result?.order; // Retrieve saved order
      if (savedOrder) {
        const userListContainer = document.querySelector('.user-list-container');
        const users = Array.from(userListContainer.querySelectorAll('.user'));
        savedOrder.forEach(userId => {
          const userElement = users.find(user => user.getAttribute('id') === userId);
          if (userElement) {
            userListContainer.appendChild(userElement); // Append in the saved order
          }
        });
      }
    };
    request.onerror = event => {
      console.error("Error loading user order:", event.target.errorCode);
    };
  }).catch(error => {
    console.error("Error opening database:", error);
  });
}


