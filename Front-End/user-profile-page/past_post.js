//M4: Load posts from server and filter them by the current user
    //get userid
async function getuserid(){
        try {
            // request for current user info
            const response = await fetch('http://localhost:3000/api/auth/current-user', {
                method: 'GET',
                credentials: 'include',
            });
    
            if (response.ok) {
                const data = await response.json(); //get json data
                // get username
                currentUserId = data.user.username;
                console.log(currentUserId);
                return currentUserId;
            } else {
                console.error('Failed to fetch current user. Status:', response.status);
                // alert('You are not logged in. Redirecting to login page.');
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
            alert('An error occurred.');
        }
}
    
function loadPostsFromServer() {
    const url = 'http://localhost:3000/api/posts';

    fetch(url, {
        method: 'GET',
        credentials: 'include' // include cookie for session
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(posts => {
        const postsList = document.querySelector('.posts-list');
        if (postsList) {
            postsList.innerHTML = '';

            const currentUser = localStorage.getItem('loggedInUsername'); 
            const filteredPosts = posts.filter(post => post.userId === getuserid());            


            console.log(filteredPosts);
            return filteredPosts;
        } else {
            console.error('Cannot find .posts-list element');
        }
    })
    .catch(error => {
        console.error('Error fetching posts from server:', error);
    });
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadPostsFromServer();
});