## Description

We have decided to make 7 posts in total: Log in page, Sign up page, Post information Page (main page), user profile page, chat page, post creating page (Drivers and Passengers), User type selection page (Optional)

## UI diagrams

The relative path to the pdf file of the drawn UI design is : team/m2/326 ui design (draft 1).pdf

### Explanations of each diagram:
- Login page: The login page is built for users to log into their own account using their UMass email. The purpose of using UMass email
is to enable better security and easier user identification since our application aims to provide a ridesharing platform for UMass students only. Users will also need their password to log in. In case the user is a new user, we also provide a link to Sign up page, in which we will send verification emails to users, and ask them to create their own password.

- Sign up Page: The sign up page is built for new users to create their own account using their UMass email. Users will need to input the verification code we sent to verify themselves before creating new accounts. Users will create their password for logging in later.

- Post information page: This is the main page for our website, where users will have a vision on 
    -- `our logo`: they can use to return to this main page, 
    -- `search bar`: the user can use to search their desired locations,
    -- `filter bar`: the users can use to filter the  desired time, location, available number of passengers, etc, 
    -- `sort bar`: allows user to sort each posting by time, cost, and distance from their destination,
    -- `postings list`: allows users to browse all the postings, if the user finds one they prefer, they can click the contact button to contact the user who posted,
    -- `profile`: shown with user's profile picture, it is used to allow user to access their profile page to edit and view their personal information,
    -- `chat`: allows user to access the Chat page,
    -- `switch`: allows user to switch to see the posts from passenger/driver perspective.

- User profile page: In this page, user will be able to edit and view their personal information. On the top left corner, there is our logo that will lead the user back to the main page. On the left side, there is a bar that contains:
    -- `information`: where the user can view and edit the basic information such as profile picture
    -- `posts`: where the user can view and post past and new ride shares
    -- `history trips`: where the user can view all the past trips with detailed information
    -- `feedback`: where the user can send feedback and view feedbacks from other users
    -- `settings`: where the user can access settings of the website
    -- `help`: where the user can request help on the website and ask questions
    -- `log out`: where the user can log out of the account, and it will take the user back to the log in page
The default page for this page is the information page. 

- Chat page: 
    In this page, the user can chat with other people who request a ride share. On the top left corner, there is our logo that takes the user back to the main page. On the left side, there is a bar that lists all the users who is or was chatting with the user. There is also a search bar that allows the user to search for a specific user to chat. On the top right corner, there is user's profile picture that allows the user to access the User profile page. In the middle of this page, user will be able to chat with another user with basic structure of chatting, including typing and sending. On the top of the chat box, the user name that the user is chatting to is displayed, and there is also a block button that allows user to block other users in case the user is having a horrible experience.

- post creating page for drivers/passengers:
    The ride posting page for both drivers and passengers are alike. Here the user will be able to select a time frame which the user is comfortable leaving, as well as the expected cost (with a suggest cost calculated by us(might be implemented with enough user data)), user's destination, comments the user want to show(can include the preferred way the user want to perform the money transaction (cash/venmo/zelle/...))
    Before editing the post, the users will be asked to choose whether they are creating the post as passengers/drivers.

    ### Use Case:
    The general pipeline of the UI is such:
    When a user is accessing our website:
    - User login page: the user either log in or create their account
    After the user logs into their account:
    - Drive posting page (Main page): users can browse all the postings and contact publishers if they are interested in specific post, and they can always use 'filer', and 'sort' to only focus on the posts that benefits their interests. 
    - The logo on the top left corner allows user to always be able to return to the main page.
    - The user profile picture on the top right corner allows user to always be ale to access their personal information page:
     - In the user information page, the user can click posts on the left to access the posting page for either driver or passenger
