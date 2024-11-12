document.addEventListener('DOMContentLoaded', () => {
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
});
