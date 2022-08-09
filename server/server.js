// server/server.js

const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

// require routers
const parksRouter = require('./routes/api.js');
// console.log('this is what parksRouter looks like... ', parksRouter);

// using Theme Parks Wiki V1 API: https://www.themeparks.wiki/
// API documentation list: https://api.themeparks.wiki/docs/v1/ 
// Disneyland Park
/** 
 * {
    "id": "7340550b-c14d-4def-80bb-acdb51d49a66",
    "name": "Disneyland Park",
    "slug": "disneylandpark",
    "location": {
        "latitude": 33.8095545068,
        "longitude": -117.9189529669,
        "pointsOfInterest": []
    },
    "parentId": "bfc89fd6-314d-44b4-b89e-df1a89cf991e",
    "timezone": "America/Los_Angeles",
    "entityType": "PARK",
    "destinationId": "bfc89fd6-314d-44b4-b89e-df1a89cf991e",
    "externalId": "330339;entityType=theme-park"
}
 */


app.get("/api", (req, res) => {
  return res.status(200).json({message: "Hello from server!"});
})

app.use('/parks', parksRouter);

// express global error handler
app.use((err, req, res, next) => {
  console.log('ERROR: ', err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);

  // return errorObj.status.send(errorObj.message); // changed status.send to changed status.json per
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}! Hooorah!`);
})