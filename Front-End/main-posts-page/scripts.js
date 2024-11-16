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

    // Add event listeners for each button of filter
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
        if (passengerButton.classList.contains('selected')) {
            // If already selected, deselect it
            passengerButton.classList.remove('selected');
        } else {
            // Otherwise, select it and deselect the other
            passengerButton.classList.add('selected');
            driverButton.classList.remove('selected');
        }
    } else if (type === 'driver') {
        if (driverButton.classList.contains('selected')) {
            // If already selected, deselect it
            driverButton.classList.remove('selected');
        } else {
            // Otherwise, select it and deselect the other
            driverButton.classList.add('selected');
            passengerButton.classList.remove('selected');
        }
    }
}


//main function - Jinghao

document.addEventListener('DOMContentLoaded', () => {

  //Load all the posts from data base
  console.log('DOMContentLoaded');
  loadPostsFromDB();
    const filterButton = document.getElementById('filter-apply-button');
    if (filterButton) {
        filterButton.addEventListener('click', () => {
            const filterType = document.querySelector('.type-selection .selected')?.id;
            const startTime = document.getElementById('start-time').value;
            const endTime = document.getElementById('end-time').value;
            const requiredSeats = document.getElementById('seats-range').value;
            const availableLuggage = document.getElementById('luggage-range').value;

            const filterCriteria = {
                type: filterType,
                startTime: startTime,
                endTime: endTime,
                requiredSeats: requiredSeats,
                availableLuggage: availableLuggage
            };

            loadPostsFromDB(filterCriteria);
            modal.classList.remove('show'); //close filter pop up block
        });
    }

  // Event listener for profile icon click
  const profileIcon = document.querySelector('.profile-icon');
  if (profileIcon) {
    profileIcon.addEventListener('click', () => {
      window.location.href = 'user-profile.html'; // Redirect to user profile page
    });
  }

  // Event listener for post button click
  const postButton = document.querySelector('.post-button');
  if (postButton) {
    postButton.addEventListener('click', () => {
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


function loadPostsFromDB(filterCriteria = {}) {
  console.log("trying to load posts from database...");
  openDatabase().then((db) => {
      const transaction = db.transaction('posts', 'readonly');
      const store = transaction.objectStore('posts');
      const request = store.getAll();

      request.onsuccess = (event) => {
          console.log("load posts successfully");
          const posts = event.target.result;
          const postsList = document.querySelector('.posts-list');
          if (postsList) {
              postsList.innerHTML = ''; //clear current posts

              //apply filter to posts
              const filteredPosts = posts.filter((post) => {
                  let match = true;

                  // filter: user type
                  if (filterCriteria.type && filterCriteria.type !== 'all' && post.type !== filterCriteria.type) {
                      match = false;
                  }

                  // Filter: time-range
                  if (filterCriteria.startTime && filterCriteria.endTime) {
                      const postTime = new Date(`${post.date} ${post.time}`).getTime();
                      const startTime = new Date(filterCriteria.startTime).getTime();
                      const endTime = new Date(filterCriteria.endTime).getTime();
                      if (postTime < startTime || postTime > endTime) {
                          match = false;
                      }
                  }

                  // filter: seats
                  if (filterCriteria.requiredSeats && parseInt(post.passengers) <= parseInt(filterCriteria.requiredSeats)) {
                      match = false;
                  }

                  // filter: luggage
                  if (filterCriteria.availableLuggage && parseInt(post.luggage) <= parseInt(filterCriteria.availableLuggage)) {
                      match = false;
                  }

                  return match;
              });

              //create posts that fits the conditions
              filteredPosts.forEach((post) => {
                  console.log("load post:", post);
                  createPost(post);
              });
          } else {
              console.error('cannot find .posts-list element');
          }
          console.log("Finish loading posts");
      };

      request.onerror = (event) => {
          console.error('Error loading posts from IndexedDB:', event.target.error);
      };
  });
}
