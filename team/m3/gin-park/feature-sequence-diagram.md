Below is a sequence diagram chat messaging on the front end, where users can type in a message and the inbox will dynamically load those messages. 
This feature was implemented collaboratively with Sammie Yu, who implemented the persistence of entered messages using indexedDB.

```mermaid
sequenceDiagram
    participant User
    participant index.html
    participant scripts.js

    User ->> index.html: Type message and press Enter
    index.html ->> scripts.js: Capture Enter key event
    scripts.js -->> scripts.js: Create new message element
    scripts.js ->> index.html: Append message to chatbox
    index.html ->> User: Display updated chatbox
```
