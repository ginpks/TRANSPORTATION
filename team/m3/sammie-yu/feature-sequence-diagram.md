This is the sequence diagram for Chatbox Page of URide. It was implemented collaboratively with Gin Park, who implemented the dynamic Chatbox and dynamic responsiveness.


```mermaid
sequenceDiagram
    participant User
    participant UserList
    participant Chatbox
    participant IndexDB

    UserList -->> User: Display the users that can chat with 
    User ->> UserList: Select or search for the user that want to interact with
    UserList -->> UserList: Move the selected user to the top of the list
    UserList ->> IndexDB: Store updates in user list
    UserList ->> Chatbox: Display selected user
    User ->> Chatbox: enter the message and click 'send'
    Chatbox -->> Chatbox: create a new message element
    Chatbox ->> IndexDB: Store new message 
    Chatbox -->> User: Display updated chatbox
    
```
