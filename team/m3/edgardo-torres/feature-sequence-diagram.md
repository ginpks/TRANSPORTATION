This is a sequence diagram for the Create Post page, The User selects Diver or Passenger for the forum selection. The user fills out the forum, when the user is done filling out the post the user clicks on "Post Ride!" and the forum gets stored with indexDB.
```mermaid
sequenceDiagram
    participant User
    participant UI as Post Creation Page
    UI->>User: Display "Driver" or "Passenger" Option
    User->>UI: Select "Driver" or "Passenger"
    User->>UI: Fill out Post
    User->>UI: Click "Post Ride!"
    UI->>indexDB: Send Post Data to save

 
    UI-->>User: Display "Post Created Successfully" Message
```
