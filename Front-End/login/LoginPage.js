const signInButton = document.getElementById('SignIn');
const invalidUser = /[^ \w@.]/;

signInButton.addEventListener('click', async function (event) {
  event.preventDefault();

  const username = document.getElementById('usr').value.trim();
  const password = document.getElementById('psw').value.trim();

  // Input validation
  if (invalidUser.test(username) || username.length === 0 || password.length === 0) {
    alert('Invalid input. Please check your username and password.');
    return;
  }

  try {
    // Send login request to the back-end
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include' // include cookie, to keep track of communication
    });

    if (response.ok) {
      const data = await response.json();
      alert('Login successful');
      // Save it in local storage such that it can be used for user profile page
      localStorage.setItem('loggedInUsername', username);
      // Redirect to the user profile or main page
      window.location.href = 'user-profile-page/index.html';
    } else {
      const error = await response.json();
      alert(error.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});