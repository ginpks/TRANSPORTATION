# Application Data 

##  Overview

### 1. User Profile

- **Description**: Contains personal information about the user, including login details and preferences.
- **Attributes**:
  - `user_id` (string): A unique identifier for each user.
  - `name` (string): The user's full name.
  - `Identity` (string): The user’s pronouns
  - `email` (string): The user's email address.
  - `password` (string): A hashed version of the user's password.
  - `Profile picture` (image): The user’s profile picture.
  - `Feedback` (string) + rating(int): Feedback received from riders or passengers.
  - `Recent location` (string/geological coordinates): Recently used locations (help users with faster searches and postings).

- **Data Source**: User-input data when registering or updating their profile.

### 2. Ride Postings

- **Description**: contains information about available ride postings.
- **Attributes**:
  - `Location` (string/geological coordinates) (or may give some popular location choices like Bos, NYC, Springfield to make Search Function easier) - Pick up Location and Destination.
  - `Time` (Option: choose in Calendar and time).
  - `Number of people` (int) (or free position): (Option: from 1 to 6).
  - `Luggage` (int) (or Free position): (Option: from 0 to 8).
  - `Notes` (String): any extra information for every posting, including the way of payments.
  - `Filter_category` (string): categorization for filtering/searching.
    
- **Data Source**: User input via creating a posting.

### 3. Chat Feature

- **Description**: contains user messages and data regarding rideshares.
- **Attributes**:
  - `Message_content` (string): text content of each message.
  - `Sender_id` (int): unique identifier for the person who sends the message.
  - `Receiver_id` (int): unique identifier for the person who receives the message.
  - `Message_id` (int): unique identifier for each message.
  - `Timestamp` (int): date and time the message was sent/received.
  - `Message_status` (string): sent/received/read/failed.
- **Data Source**: User input via messaging; system-generated data.

### 4. Feedback Form

- **Description**: A feedback that contains a star rating and a text message.
- **Attributes**:
  - `sender_id` (int): unique identifier for the person who sends the feedback.
  - `Receiver_id` (int): unique identifier for the person who receives the feedback.
  - `Timestamp` (int): date and time the feedback was created.
  - `Feedback_content` (string): the content of the feedback.
  - `Star_rating` (int): rating the experience out of 5 stars.

- **Data Source**: User input via creating a feedback for someone; system-generated data.



## Data Sources

- **User-Input Data**: the user will provide all data including ride postings, account setup, and messaging/communication.
- **System-Generated Data**: Timestamps require access to time from the local system. 
- **Google Map API**: the API will provide map data regarding locations for quick selection.
