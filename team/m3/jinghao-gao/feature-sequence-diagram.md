Below is a sequence diagram for Main-page on the front end, where users can see a series of posts and can use Search, Filter, and Sort to specify the showing list. 
Filter and Sort feature was implemented collaboratively with Lana vu.

```mermaid
sequenceDiagram
    title Main Page Sequence Diagram

    participant User
    participant Search
    participant Filter
    participant Sort
    participant BrowserPostsList
    participant IndexDB

    BrowserPostsList ->> IndexDB: Request for newest data
    IndexDB -->> BrowserPostsList: Send posts data
    BrowserPostsList -->> User: Display default posts list

    User ->> Search: Enter keywords to the search bar
    Search ->> BrowserPostsList: Package keywords to filterCriteria
    BrowserPostsList ->> IndexDB: Request for newest data
    IndexDB -->> BrowserPostsList: Send posts data
    BrowserPostsList -->> BrowserPostsList: Filter the corresponding posts based on filterCriteria
    BrowserPostsList -->> User: Display filtered posts

    User ->> Filter: Enter keywords to the Filter Block
    Filter ->> BrowserPostsList: Package keywords to filterCriteria
    BrowserPostsList ->> IndexDB: Request for newest data
    IndexDB -->> BrowserPostsList: Send posts data
    BrowserPostsList -->> BrowserPostsList: Filter the corresponding posts based on filterCriteria
    BrowserPostsList -->> User: Display filtered posts

    User ->> Sort: Select sorting condition
    Sort ->> BrowserPostsList: Send condition
    BrowserPostsList -->> BrowserPostsList: Sort the posts based on the condition
    BrowserPostsList -->> User: Display sorted posts
```
