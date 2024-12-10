//M4: Load posts from server and filter them by the current user
    //get userid
// Async function to get the user ID
async function getUserId() {
    try {
        const response = await fetch('http://localhost:3000/api/auth/current-user', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            console.error('Failed to fetch current user. Status:', response.status);
            return null;
        }

        const data = await response.json();
        const currentUserId = data.user.username;
        console.log('Current User ID:', currentUserId);
        return currentUserId;

    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}

async function loadPostsFromServer() {
    const userId = await getUserId();
    if (!userId) {
        console.error('No user ID found, cannot filter posts.');
        return;
    }

    const url = 'http://localhost:3000/api/posts';
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        console.log('Got posts from the server');
        const posts = await response.json();

        const postsList = document.querySelector('.posts-list');
        if (!postsList) {
            console.error('Cannot find .posts-list element');
            return;
        }

        postsList.innerHTML = '';
        
        // Filter posts by the current user
        const filteredPosts = posts.filter(post => post.userId === userId);
        console.log('Filtered Posts:', filteredPosts);

        filteredPosts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>From:</strong> ${post.from}<br>
                <strong>Destination:</strong> ${post.destination}<br>
                <strong>Type:</strong> ${post.type}<br>
                <strong>Date:</strong> ${post.date || 'Not specified'}<br>
                <strong>Time:</strong> ${post.time || 'Not specified'}<br>
                <strong>Luggage:</strong> ${post.luggage || 'None'}<br>
                <strong>People:</strong> ${post.people || 'Not specified'}<br>
                <strong>Extra Info:</strong> ${post.extraInfo || 'No additional info'}<br>
                <small>Posted on: ${new Date(post.createdAt).toLocaleString()}</small>
            `;
            postsList.appendChild(listItem);
        });


    } catch (error) {
        console.error('Error fetching posts from server:', error);
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadPostsFromServer();
});
