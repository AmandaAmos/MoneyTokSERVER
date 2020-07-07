///Dependencies
//======================================================
const db = require("../models");


//Routes
//=========================================================
module.exports = function(app) {

//Get all users
app.get("/api/user", function(req, res) {
    db.user.findAll({}).then(function(dbuser) {
      res.json(dbuser);
    });
  });

// //Gets a specific user
app.get("/api/user/:id", function(req, res) {
    // Find one user with the id in req.params.id and return them with res.json
    db.user.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  //create new user
  app.post("/api/user", function (req, res) {

     db.user.create({
         firstname : req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email,
         username: req.body.username,
         password: req.body.password,
         balance: req.body.balance

 
     }).then(function (user) {
        // send back the user id to client
        res.json(user.id);
         console.log("Inserted a new user into our user table!");
     }).catch(function(err){
       //if error
         console.log(err);
         //sends an error to the client
         res.send(false);
     })
 })


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    };