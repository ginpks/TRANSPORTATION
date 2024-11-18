
This is the sequence diagram for the login pages of URide. It was implemented by Raymond Huang.
    participant User
    participant createAccount.js
    participant createAccount.html
    participant chooseType.js
    participant chooseType.html
    participant loginPage.js
    participant loginPage.html
    participant backendDatabase


    User ->> loginPage.html: Type username and password if applicable and press Enter, if not press create account
    loginpage.html ->createAccount.html:
    createAccount -> backend Database: saves password, username and email and sends verification email
    backend Database -> email with ver. code. then brings to profile page.

    loginpage.html -> chooseType.html: can now choose if user wants to be a driver or a rider or to skip
    chooseType.html -> user: if skip, brings to profile, if rider/driver, brings to page with prefrence already to rider/driver
