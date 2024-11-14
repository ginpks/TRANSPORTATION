// import { BaseComponent } from './BaseComponent.js';
// import { EventHub } from './EventHub.js';
// import { Events } from './Events.js';
// import { TaskRepositoryService } from './TaskRepositoryService.js';
import {openDatabase, storePostInDB} from '../CreatePost-page/scripts.js'




// Filter and Sort feature - Lana
// Get the modal, open button, and close button elements
const modal = document.getElementById("modal");
const filterButton = document.getElementById("filter-button");
const closeButton = document.getElementById("close-button");

// Show the modal when the filter button is clicked
filterButton.onclick = function() {
    modal.classList.add("show");
}

// Hide the modal when the close button is clicked
closeButton.onclick = function() {
    modal.classList.remove("show");
}

// Optionally, close the modal when clicking outside of the modal content
window.onclick = function(event) {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    const passengerButton = document.getElementById('passenger');
    const driverButton = document.getElementById('driver');

    // Add event listeners for each button
    passengerButton.addEventListener("click", function() {
        selectType('passenger');
    });
    driverButton.addEventListener("click", function() {
        selectType('driver');
    });
});

// Type selection function
function selectType(type) {
    const passengerButton = document.getElementById('passenger');
    const driverButton = document.getElementById('driver');
    
    if (type === 'passenger') {
        passengerButton.classList.add('selected');
        driverButton.classList.remove('selected');
    } else {
        driverButton.classList.add('selected');
        passengerButton.classList.remove('selected');
    }
}

// Adjust time by 15 minutes
function adjustTime(type, increment) {
    const inputField = document.getElementById(type + '-time');
    let time = inputField.value;

    // Parse the time and increment it
    let [hoursMinutes, period] = time.split(" ");
    let [hours, minutes] = hoursMinutes.split(":").map(Number);

    // Adjust minutes by the increment (±15 minutes)
    minutes += increment * 15;

    // Adjust hours and minutes if necessary
    if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
    } else if (minutes < 0) {
        minutes += 60;
        hours -= 1;
    }

    // Handle AM/PM transition and hour wrap-around
    if (hours === 12) {
        period = period === "AM" ? "PM" : "AM";
    } else if (hours === 0) {
        hours = 12;
        period = period === "AM" ? "PM" : "AM";
    } else if (hours > 12) {
        hours -= 12;
    }

    // Format the adjusted time back to 12-hour format
    const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
    inputField.value = formattedTime;
}

function updateRangeValue() {
    const range = document.getElementById('seats-range');
    const value = range.value;

    // Remove 'highlighted' class from all labels
    const labels = document.querySelectorAll('.range-labels span');
    labels.forEach((label) => {
        label.classList.remove('highlighted');
    });

    // Add 'highlighted' class to the current value label
    document.getElementById(`label-${value}`).classList.add('highlighted');
}

//main function - Jinghao

document.addEventListener('DOMContentLoaded', () => {
  //Load all the posts from data base
  loadPostsFromDB();
  
  console.log(123);

  // Event listener for profile icon click
  const profileIcon = document.querySelector('.profile-icon');
  if (profileIcon) {
    profileIcon.addEventListener('click', () => {
      window.location.href = 'user-profile.html'; // Redirect to user profile page
    });
  }

  // Event listener for post button click
  const newPostButton = document.querySelector('.post-button');
//   const newPostButton = document.getElementsByClassName('post-button');
  if (newPostButton) {
    newPostButton.addEventListener('click', () => {
      window.location.href = '../CreatePost-page/index.html'; // Redirect to post creation page
    });
  }

  // Google Maps search autocomplete
  // const searchInput = document.querySelector('.user-search-bar .search-input');
  // if (searchInput && typeof google !== 'undefined' && google.maps) {
  //   const searchBox = new google.maps.places.SearchBox(searchInput);
  //   searchBox.addListener('places_changed', () => {
  //     const places = searchBox.getPlaces();
  //     if (places.length === 0) return;
  //     console.log('Selected Place:', places[0].name);
  //   });
  // }
});



// Data type definition for a post
class Post {
  constructor(id, destination, from, time, date, people, luggage, extraInfo) {
    this.id = id;
    this.destination = destination;
    this.from = from;
    this.time = time;
    this.date = date;
    this.people = people;
    this.luggage = luggage;
    this.extraInfo = extraInfo;
  }
}

function createPost(post) {
    //create main container
    const postDiv = document.createElement('div');
    postDiv.className = 'posts';

    //add first line: destination, starting place
    const firstLineDiv = document.createElement('div');
    firstLineDiv.className = 'custom-post-line';

    const destinationDiv = createCustomPostDetail('custom-post-destination', 'To', post.destination);
    const startingPlaceDiv = createCustomPostDetail('custom-post-starting-place', 'From', post.from);
    const idDiv = createCustomPostDetail('custom-post-id', 'ID', `&nbsp;${post.id}`, 'custom-post-id-content');

    firstLineDiv.appendChild(destinationDiv);
    firstLineDiv.appendChild(startingPlaceDiv);
    firstLineDiv.appendChild(idDiv);
    postDiv.appendChild(firstLineDiv);

    //add second line: time/date, passenger, luggage
    const secondLineDiv = document.createElement('div');
    secondLineDiv.className = 'custom-post-line';

    const timeDiv = createCustomPostDetail('custom-post-time', 'Time', `${post.date} ${post.time}`);
    const capacityDiv = createCustomPostDetail('custom-post-capacity', 'Passenger', post.people);
    const luggageDiv = createCustomPostDetail('custom-post-luggage', 'Luggage', post.luggage);

    secondLineDiv.appendChild(timeDiv);
    secondLineDiv.appendChild(capacityDiv);
    secondLineDiv.appendChild(luggageDiv);
    postDiv.appendChild(secondLineDiv);

    //add third line: note
    const thirdLineDiv = document.createElement('div');
    thirdLineDiv.className = 'custom-post-line';

    const notesDiv = createCustomPostDetail('custom-post-notes', 'Notes', post.extraInfo, 'notes-detail');
    thirdLineDiv.appendChild(notesDiv);
    postDiv.appendChild(thirdLineDiv);

    //add redirect link
    postDiv.addEventListener('click', ()=>{
        window.location.href = `../chat-page/index.html?id=${post.id}`;
    })

    //append posts to posts-list
    const postsList = document.querySelector('.posts-list');
    postsList.appendChild(postDiv);
}

//helper function for creating post details
function createCustomPostDetail(className, title, detail, detailClass = 'custom-post-detail') {
    const containerDiv = document.createElement('div');
    containerDiv.className = className;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'custom-post-title';
    titleSpan.innerText = title;

    const detailSpan = document.createElement('span');
    detailSpan.className = detailClass;
    detailSpan.innerHTML = detail;

    containerDiv.appendChild(titleSpan);
    containerDiv.appendChild(detailSpan);

    return containerDiv;
}


function loadPostsFromDB() {
  console.log("trying to load posts from database...");
  openDatabase().then((db) => {
      const transaction = db.transaction('posts', 'readonly');
      const store = transaction.objectStore('posts');
      const request = store.getAll();

      request.onsuccess = (event) => {
        console.log("load posts successfully");
          const posts = event.target.result;
          const postsList = document.querySelector('.posts-list');
          // const postsList = document.getElementsByClassName('.posts-list');
          if (postsList) {
          postsList.innerHTML = ''; // Clear existing posts

          posts.forEach((post) => {
            console.log("load post:", post);
            createPost(post);
          });
        }
        else {
          console.error('cannot find .posts-list element');
        }
        console.log("Finish loading posts");
      };

      request.onerror = (event) => {
          console.error('Error loading posts from IndexedDB:', event.target.error);
      };
  });
}


