# themepark-itinerary-maker
Solo project CRUD app.

## How to get started
- Run `npm install` to install all the dependencies
- You can begin the dev environment by starting the server with `npm start` then running `npm run dev`. This will open a web dev server at localhost:8080 with proxies set up to handle requests to localhost:3000. (see `webpack.config.js` for more details on how the dev-server is set up.)

## File Organization
The set up is largely divided into two folders, `src` and `server`. The `src` folder contains frontend files which deals with mostly what the client will see. Static files such as `index.html` and `style.css` are all located here. 

You'll notice that most of the frontend files are divided between `components` and `containers` folders. Frontend elements are created using React components. The webpage is divided into two main containers: the `searchContainer` and the `itineraryContainer`. The searchContainer is the main stateful element which keeps track of selection bar options from the user's input and creates a search query to send to backend/database. Most of the searchContinaer and it's inner components functionality is completed. The itinerary container mainly showcases placeholders and most of functionality of that section has **not** been completed. 

The backend is composed of a `node.js` server with http/api requests being handled by `express.js` and `express-router`s. Two API's are used in order to access live updated information about Disneyland's ride status' and wait times. The `queueTimeController` sends request to QueueTime API (https://queue-times.com/en-US) while `themeparkController` sends requests to Theme Parks Wiki API (https://api.themeparks.wiki/). Currently the QueueTime API is being used to pull Disneyland rides information by location, while Theme Parks Wiki API is used for live wait time data and wait time forecasts. 

MongoDB is used as the database to keep track of users and itineraries associated with users. Only the basic structure of the database is set up. Mongoose is used to interact with the database. 

## What works? What needs work?
**Working**
- Most of searchContainer
  - states and useEffects are working well
  - select options are populated and changed based on previous selections. 
  - Wait time is displayed in the box according to user selections.
  - Wait time box color changes depending on how long the wait time is (or if the ride is closed).
  - 'Add to Itinerary' button is functioning with a propoer `onClick` function attached to it. It packages all the important information as an object and currently console logs. 
- Users are identified using cookies. 
  - New user documents are created when a user visits the homepage without a cookie. 
  - Returning users are identified and server checks if there exists an itinerary associated with the user.
- Requests to APIs are working well :)

**Need to work on for MVP**
- Using the information that gets saved when the 'add to itinerary' button is clicked, format the data nicely and send to server to create a 'card' document that can then be added to the itinerary.
- Itinerary box should then show a 'card' object.
- Need to resolve creation of cards based on availability of current itinerary. 
  - If a new card is slated for a time slot that is already occupied in the itinerary, users should not be able to create a new card. 
- Reorganization of data. Location and rides should be saved locally or on a separate database collections and NOT dependent on pulls from API as those relationships are static. API requests are only necessary for live status of rides and wait times. 
  - Theme Park Wiki API wait times only work during park open hours. Would be great to create a static "average" wait time or save the API forecast information into database once it's been called. 

**Stretch Goals**
- Login functionality and a way to save itineraries and pull up saved itineraries. 
  - comparison function between saved itineraries
- Optimization of itinerary based on distance and wait times of rides
- Drag and drop functionality of cards in itinerary
- Modular card heights that represents length of wait time (longer wait times should be longer)
- Nicer/sleeker/more modern looking design
- Save average wait times per hour/per day of week/per day of year in database instead of live wait time data in order to serve up better estimation. (QueueTime website has some great agregated data.)
- Instead of pulling from API for data, receive data directly from the source (disneyland app?)


