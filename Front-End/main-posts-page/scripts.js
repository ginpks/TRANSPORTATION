// import { BaseComponent } from './BaseComponent.js';
// import { EventHub } from './EventHub.js';
// import { Events } from './Events.js';
// import { TaskRepositoryService } from './TaskRepositoryService.js';
import {openDatabase} from '../CreatePost-page/scripts.js'


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
loadPostsFromDB();
console.log(123);

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
  if (newPostButton) {
    newPostButton.addEventListener('click', () => {
      // window.location.href = '../CreatePost-page/index.html'; // Redirect to post creation page
      // window.location.href = 'https://papago.naver.com';
      window.location.replace("https://www.runoob.com");
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
export class Post {
  constructor(destination, startingPlace, time, passengers, luggage, notes) {
    this.destination = destination;
    this.startingPlace = startingPlace;
    this.time = time;
    this.passengers = passengers;
    this.luggage = luggage;
    this.notes = notes;
  }
}

function createPosts(postData) {
  // create a div to represent a post
  const postDiv = document.createElement('div');
  postDiv.className = 'posts';

  // set up inner html structure for post
  postDiv.innerHTML = `
      <div class="custom-post-line">
          <div class="custom-post-destination">
              <span class="custom-post-title">To</span>
              <span class="custom-post-detail">${postData.destination}</span>
          </div>
          <div class="custom-post-starting-place">
              <span class="custom-post-title">From</span>
              <span class="custom-post-detail">${postData.from}</span>
          </div>
      </div>
      <div class="custom-post-line">
          <div class="custom-post-time">
              <span class="custom-post-title">Time</span>
              <span class="custom-post-detail">${postData.time}</span>
          </div>
          <div class="custom-post-capacity">
              <span class="custom-post-title">${postData.type === 'passenger' ? 'Passengers' : 'Available Seats'}</span>
              <span class="custom-post-detail">${postData.people ?? postData.availableSeats}</span>
          </div>
      </div>
      <div class="custom-post-line">
          <div class="custom-post-notes">
              <span class="custom-post-title">Notes</span>
              <span class="custom-post-detail notes-detail">${postData.extraInfo}</span>
          </div>
      </div>
  `;

  return postDiv;
}


export function loadPostsFromDB() {
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
              const postDiv = createPosts(post);
              postsList.appendChild(postDiv);
          });
        }
        else {
          console.error('cannot find .posts-list element');
        }
      };

      request.onerror = (event) => {
          console.error('Error loading posts from IndexedDB:', event.target.error);
      };
  });
}

window.loadPostsFromDB = loadPostsFromDB;