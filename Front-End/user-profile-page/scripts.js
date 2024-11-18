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

    const logoutLink = document.querySelector("a[href='logout.html']");
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser();
        });
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

    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;

    try {
        await saveFeedback(rating, comments); // Save to IndexedDB
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
    const feedbackList = await getFeedback();
    const feedbackContainer = document.getElementById('feedbackList');
    feedbackContainer.innerHTML = ''; // Clear existing content

    if (feedbackList.length === 0) {
        feedbackContainer.innerHTML = '<p>No feedback submitted yet.</p>';
        return;
    }

    feedbackList.forEach((feedback) => {
        const feedbackItem = document.createElement('div');
        feedbackItem.innerHTML = `
            Rating  : ${feedback.rating} <br>
            Comments: ${feedback.comments} <br>
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


// // IndexedDB setup
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('FeedbackDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // Create an object store for feedback
            if (!db.objectStoreNames.contains('feedback')) {
                db.createObjectStore('feedback', { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(`Database error: ${event.target.errorCode}`);
        };
    });
}
async function saveFeedback(rating, comments) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction('feedback', 'readwrite');
        const store = transaction.objectStore('feedback');

        const feedback = {
            rating: rating,
            comments: comments,
            timestamp: new Date().toISOString(),
        };

        const request = store.add(feedback);

        request.onsuccess = () => {
            resolve('Feedback saved successfully');
        };

        request.onerror = (event) => {
            reject(`Failed to save feedback: ${event.target.errorCode}`);
        };
    });
}
async function getFeedback() {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction('feedback', 'readonly');
        const store = transaction.objectStore('feedback');

        const request = store.getAll();

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(`Failed to retrieve feedback: ${event.target.errorCode}`);
        };
    });
}


