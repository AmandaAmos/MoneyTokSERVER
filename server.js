const express = require("express");
const session = require("express-session");
const passport = require("passport");
const axios = require("axios");
const sequelize = require("sequelize");
const SequelizeStore = require("connect-session-sequelize") (session.Store);
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(
  session ({
    secret: "keyboard cat",
    store: new SequelizeStore({
      db: db.sequelize,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000},
    rolling: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/apiRoutes") (
  app, 
  passport, 
  isAuthenticatedMiddleware,
);

require("./routes/userRoutes") (
  app,
  isAuthenticatedMiddleware,
  isNotAuthenticatedMiddleware
);

function isAuthenticatedMiddleware() {
  return (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
  };
}

function isNotAuthenticatedMiddleware() {
  return (req, res, next) => {
    if(!req.isAuthenticated()) return next();
    res.redirect("/");
  };
}

// Syncing our sequilize models and then starting our Express APP
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
  console.log(`Server listening on: http://localhost:${PORT}!`);
  });
});