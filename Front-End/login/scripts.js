// Define the base API URL
const BASE_API_URL = "http://localhost:3000/api"; // Adjust this if your server is hosted elsewhere

document.addEventListener('DOMContentLoaded', () => {
// Select DOM elements
const loginButton = document.getElementById("SignIn");
const createAccountButton = document.querySelector("#button5");

// Event listener for login submission
loginButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default button behavior

    // Capture input values
    const username = document.getElementById("usr").value.trim();
    const password = document.getElementById("psw").value.trim();

    // Validate inputs
    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        // Send login data to the server
        const response = await fetch(`${BASE_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        // Handle server response
        const result = await response.json();

        if (response.ok) {
            // Navigate to main page on successful login
            window.location.href = "../main-posts-page/index.html"; // Adjust the path if necessary
        } else {
            // Display error message
            alert(result.message || "Login failed. Please try again.");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred. Please try again later.");
    }
});

// Event listener for "Create New Account" button
createAccountButton.addEventListener("click", () => {
    // Redirect to the Create Account page
    window.location.href = "CreateAccount.html"; // Adjust the path if necessary
});
});