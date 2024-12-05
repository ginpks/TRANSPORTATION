
# Application Features

## Create Posts for rides/ride requests

This feature will allow users to post ride offerings and ride requests, which will be then displayed as a listing for easier viewing. The postings will include the details about the ride like time, exact location, space availability, price, or any other specifications or preferences.

**Point Value**: 5 points

**Assigned to**: Edgardo Torres, Jinghao Gao

1. **Feature name:** IndexDB connection
Save and write post information that the user inputs to the indexDB so that we can load these data in the main page.
  **Point Value**: 1 points

  **Assigned to**: Jinghao Gao

## Main page view 

This is the main view, where all the postings will appear. Upon clicking on a specific posting, the chat screen will appear. There are also search/filter/sort functions available to use from the main view. 

**Point Value**: 4 points

**Assigned to**: Jinghao Gao

1. **Feature name:** Filter the posts on the main page

This feature will allow users to filter the postings by time, location, and price, so that users can find the rides that are the best fit for their needs. For example, the users will be able to filter for the rides available for a specific route or filter all the rides that are posted for a specific date. 

**Point Value**: 5 points

**Assigned to**: Lana Vu, Jinghao Gao

2. **Feature name:** Post List
Load post information from the indexDB and construct HTML structure for each post.

  **Point Value**: 1 points

  **Assigned to**: Jinghao Gao

3. **Feature name:** Search the posts on the main page

This feature will allow users to search for posts that are either going from or to a specific destination. 

**Point Value**: 2 point 

**Assigned to**: Lana Vu

4. **Feature name:** Sort the posts on the main page

This feature will allow users to sort the existing posts by location (from where they are heading out), date of departure, or number of passengers. 

**Point Value**: 3 point 

**Assigned to**: Lana Vu

  
## User/client communication

1. **Feature name:** Chat Inbox

- **Description**: The chat inbox stores all messages sent between users for communication. This component includes an input box where users can type their messages as well as a send button. The chat inbox dynamically updates with any messages entered by the user. All the sent messages will be stored in the IndexDB for persistence. Gin Park implemented all the dynamic behaviors and functions, and Sammie Yu implemented the message persistence.

  **Point Value**: 5 points

  **Team Member**: Gin Park, Sammie Yu

2. **Feature name:** Small View Chat Page

- **Description**: The chat page for small view devices such as mobile phones utilizes a dropdown container constisting of the user list component that was implemented by Sammie Yu for the main view chat page. Transitioning to a dropdown for smaller views ensures simplicity for the user when selecting a chatroom.

  **Point Value**: 3 point

  **Team Member**: Gin Park

3. **Feature name:** User List

- **Description**: The User List contains all the users for communication. User can click it and scroll it. Clicking a user moves them to the top of the user list dynamically, and the user list will automatically scroll to the top, which adapts intuition and ensures users can quickly find their most recent conversations. Updates of user list will be stored in IndexDB.

  **Point Value**: 4 point

  **Team Member**: Sammie Yu

4. **Feature name:** Search Bar for User List

- **Description**: User can search for the name of other users that they want to chat with. 

  **Point Value**: 3 point

  **Team Member**: Sammie Yu
  

## Log in and ID verification

This feature will allow users to log in to their accounts to keep track or their information. Moreover, for security reasons all users need to verify that they are UMass affiliated people. 

**Assigned to**: Ray Huang

## Location tracker/map

- **Description**: This feature will display the exact pickup and dropoff location for each ride. This will help users find each other with more precision to avoid situations when either party gets lost. 

  **Point Value**: 3 points

  **Assigned to**: Eric Chen

## User profile page

- **Description**: This feature allows user to take a glimpse on his or her information and make modifications. It also leads users to other pages in their convenience.

  **Point Value**: 3 points

  **Assigned to**: Eric Chen

## Feedback 

This feature will allow the users to post their feedback after the trip to make a better experience in the future. Since it's going to be shown in public, it makes both parties want to cooperate to get the high rankings for the experience. This will include the star rating after the ride (out of 5) and other feedback options like "great music", "quiet ride", or "certified yapper". 

**Point Value**: 3 points

**Assigned to**: Edgardo Torres
