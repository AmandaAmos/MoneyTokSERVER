const express = require("express");
const axios = require("axios");
const sequelize = require("sequelize");
const path =require("path");
const routes = require("./routes")(app);



const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

//Require our models for syncing
const db = require("./models");

// Syncing our sequilize models and then starting our Express APP
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
  console.log(`🌎  ==> App now listening on PORT ${PORT}!`);
  });
});