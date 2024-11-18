title Main Page Sequence Diagram

participant User
participant Search
participant Filter
participant Sort
participant BrowserPostsList
participant IndexDB

BrowserPostsList->IndexDB:Request for newest data
BrowserPostsList<--IndexDB:Send posts data
User<--BrowserPostsList:Display default posts list

User->Search:Enter keywords to the search bar
Search->BrowserPostsList:Package keywords to filterCriteria
BrowserPostsList->IndexDB:Request for newest data
BrowserPostsList<--IndexDB:Send posts data
BrowserPostsList-->BrowserPostsList:Filter the corresponding posts based on the filterCriteria
User<--BrowserPostsList:Display filtered posts

User->Filter:Enter keywords to the Filter Block
Filter->BrowserPostsList:Package keywords to filterCriteria
BrowserPostsList->IndexDB:Request for newest data
BrowserPostsList<--IndexDB:Send posts data
BrowserPostsList-->BrowserPostsList:Filter the corresponding posts based on the filterCriteria
User<--BrowserPostsList:Display filtered posts

User->Sort:Select sorting condition
Sort->BrowserPostsList:Send condition
BrowserPostsList-->BrowserPostsList:Sort the posts based on the condition
User<--BrowserPostsList:Display filtered posts
