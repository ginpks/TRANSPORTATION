document.addEventListener('DOMContentLoaded', () => {
    console.log('User profile page scripts loaded');
    const links = document.querySelectorAll('.sidebar ul li a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.textContent.trim();
            navigateToPage(pageName);
        });
    });


    async function logout() {
        try {
            const response = await fetch("http://localhost:3000/api/auth/logout", { method: "GET", credentials: "include" });
            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                localStorage.clear();
                window.location.href = "../login/LoginPage.html"; 

            } else {
                alert(data.message || "Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred. Please try again.");
        }
    }


    const logoutButton = document.querySelector('#logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }


    async function chatroom(){
        const userName = document.querySelector('#username-display');
        window.location.href = `../chat-page/index.html?session_id=${null}&currentUserId=${userName.textContent}&postOwnerId=${null}`;
    }

    const chatRoomButton = document.querySelector('#chat-room');
    if (chatRoomButton){
        chatRoomButton.addEventListener('click', chatroom)
    }

    function navigateToPage(pageName) {
        alert(`Navigating to ${pageName}...`);
        window.location.href = `${pageName.toLowerCase().replace(/ /g, '-')}.html`;
    }

    function logoutUser() {
        if (confirm('Are you sure you want to log out?')) {
            alert('Logging out...');
            window.location.href = 'logout.html';
        }
    }

    const chatBox = document.querySelector('.chat-box');
    if (chatBox) {
        chatBox.addEventListener('click', () => {
            alert('Chat feature is coming soon!');
        });
    }


 // Feedback form submission
 document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = 'test-user'; // I need to replace with actual user ID
    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;

    try {
        await submitFeedback(userId, rating, comments); //save feedback to DB
        console.log('Feedback saved successfully!');
        e.target.reset(); // Clear the form
        displayFeedback(); // Refresh the feedback list
    } catch (error) {
        console.error('Error saving feedback:', error);
        console.log('Failed to save feedback. Please try again.');
    }
});



// Display Feedback
async function displayFeedback() {
    const feedbackList = await fetchFeedback();
    const feedbackContainer = document.getElementById('feedbackList');
    feedbackContainer.innerHTML = '';

    if (!feedbackList || feedbackList.length === 0) {
        feedbackContainer.innerHTML = '<p>No feedback submitted yet.</p>';
        return;
    }

    feedbackList.forEach((feedback) => {
        const feedbackItem = document.createElement('div');
        feedbackItem.innerHTML = `
            <p>Rating: ${feedback.rating}</p>
            <p>Comment: ${feedback.comment}</p>
        `;
        feedbackContainer.appendChild(feedbackItem);
    });
}

 // Toggle the feedback box visibility
    document.getElementById('toggleFeedbackButton').addEventListener('click', function () {
        const feedbackBox = document.getElementById('feedbackBox');
        const isVisible = feedbackBox.style.display === 'block';

        if (!isVisible) {
            // Show the feedback box
            feedbackBox.style.display = 'block';
            console.log('Feedback box is now visible');
        } else {
            // Hide the feedback box
            feedbackBox.style.display = 'none';
            console.log('Feedback box is now hidden');
        }
    });
});
// send feedback to db
async function submitFeedback(userId, rating, comment) {
    try {
        const response = await fetch('http://localhost:3000/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, rating, comment }),
        });

        if (!response.ok) {
            throw new Error(`Failed to submit feedback: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Feedback submitted successfully:', data);
    } catch (error) {
        console.error('Error submitting feedback:', error);
    }
}
//get feedback from db
async function fetchFeedback() {
    try {
        const response = await fetch('http://localhost:3000/api/feedback');
        if (!response.ok) {
            throw new Error(`Failed to fetch feedback: ${response.statusText}`);
        }

        const feedbackList = await response.json();
        console.log('Feedback fetched successfully:', feedbackList);
        return feedbackList;
    } catch (error) {
        console.error('Error fetching feedback:', error);
    }
}

// // // IndexedDB setup
// function openDatabase() {
//     return new Promise((resolve, reject) => {
//         const request = indexedDB.open('FeedbackDB', 1);

//         request.onupgradeneeded = (event) => {
//             const db = event.target.result;
//             // Create an object store for feedback
//             if (!db.objectStoreNames.contains('feedback')) {
//                 db.createObjectStore('feedback', { keyPath: 'id', autoIncrement: true });
//             }
//         };

//         request.onsuccess = (event) => {
//             resolve(event.target.result);
//         };

//         request.onerror = (event) => {
//             reject(`Database error: ${event.target.errorCode}`);
//         };
//     });
// }
// async function saveFeedback(rating, comments) {
//     const db = await openDatabase();

//     return new Promise((resolve, reject) => {
//         const transaction = db.transaction('feedback', 'readwrite');
//         const store = transaction.objectStore('feedback');

//         const feedback = {
//             rating: rating,
//             comments: comments,
//             timestamp: new Date().toISOString(),
//         };

//         const request = store.add(feedback);

//         request.onsuccess = () => {
//             resolve('Feedback saved successfully');
//         };

//         request.onerror = (event) => {
//             reject(`Failed to save feedback: ${event.target.errorCode}`);
//         };
//     });
// }
// async function getFeedback() {
//     const db = await openDatabase();

//     return new Promise((resolve, reject) => {
//         const transaction = db.transaction('feedback', 'readonly');
//         const store = transaction.objectStore('feedback');

//         const request = store.getAll();

//         request.onsuccess = (event) => {
//             resolve(event.target.result);
//         };

//         request.onerror = (event) => {
//             reject(`Failed to retrieve feedback: ${event.target.errorCode}`);
//         };
//     });
// }


