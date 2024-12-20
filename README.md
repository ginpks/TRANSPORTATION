# URide

Since UMass Amherst is located in an area where transportation to cities such as Boston or New York is limited, many students seek transportation to these destinations during breaks. However, not everyone has a vehicle or someone to drive them, while some students travel alone. We propose a rideshare app to connect these two groups, facilitating ride-sharing and ensuring every student or person can reach their destinations efficiently when needed most.


### Features

- **Ride posting**: Car owners and those in need of a ride can post their trip details. The system connects users with matching destinations and schedules for ride-sharing.
- **Private messaging**: Users can chat to arrange ride details and coordinate plans.
- **Location tracking**: Provided map helps showcase the exact location for better communication
- **Feedback form**: Rate your ride experience and leave comments to help others make informed choices.


### Built with
- **HTML**
- **JS**
- **Node.js**
- **SQLite**
- **Sequelize**
- **Socket.IO**

### Getting started
Simply clone the repository to your folder of choice and launch our express server using the command:

  ```sh
  Back-End/source/server.js
  ```
Once the express server is up and running, navigate to this link to begin using our app!
  ```sh
  http://localhost:3000/login/LoginPage.html
  ```

### Additional notes on our back end design

If you take a look at our back-end directory, you'll notice that we've designed a scalable and modular architecture that prioritizes clarity, ease of maintenance, and efficient scaling. We’ve utilized controllers to handle business logic, ensuring that our routes are clean and straightforward. The routing structure provides a clear path for managing user authentication, session handling, and messaging (using an express server in conjunction with the Socket.IO library). Additionally, our database files like `chatDB.js`, `user.js`, and `routes.js` are organized to maintain separation of concerns, making it easier to manage and extend the application while adhering to core software engineering principles.
