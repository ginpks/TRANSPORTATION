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
