//M4: Load posts from server and filter them by the current user
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

            const currentUser = window.currentUserUsername; 
            const filteredPosts = posts.filter(post => post.username === currentUser);            

            // Create posts
            filteredPosts.forEach(post => createPost(post));
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