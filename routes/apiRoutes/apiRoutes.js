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

 //create new budget
 app.post("/api/budget", function (req, res) {

    db.Budget.create({
        description: req.body.description,
        amount: req.body.amount

    }).then(function (Budget) {
       // send back the budget id to client
       res.json(Budget.id);
        console.log("Inserted a new user budget into our budget table!");
    }).catch(function(err){
      //if error
        console.log(err);
        //sends an error to the client
        res.send(false);
    })
})

//report a new transaction
app.post("/api/transaction", function (req, res) {

    db.Transaction.create({
        description: req.body.description,
        note: req.body.note,
        deposit: req.body.deposit,
        withdrawal: req.body.withdrawal,
        total: req.body.total,


    }).then(function (Transaction) {
       // send back the budget id to client
       res.json(Transaction.id);
        console.log("Reported a new user transaction into our transaction table!");
    }).catch(function(err){
      //if error
        console.log(err);
        //sends an error to the client
        res.send(false);
    })
})





























};