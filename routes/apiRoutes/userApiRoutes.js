///Dependencies
//======================================================
const db = require("../../models");
const router = require("express").Router();

//Routes
//=========================================================

//Get all users
router.get("/", function (req, res) {
  db.user.findAll({}).then(function (dbuser) {
    res.json(dbuser);
  });
});

// //Gets a specific user
router.get("/:id", function (req, res) {
  // Find one user with the id in req.params.id and return them with res.json
  db.user
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then(function (dbuser) {
      res.json(dbuser);
    });
});

//create new article
router.post("/", function (req, res) {
  db.article
    .create({
      title: req.body.title,
      byline: req.body.byline,
      link: req.body.link,
    })
    .then(function (user) {
      // send back the user id to client
      res.json(user.article);
      console.log("Inserted a new article");
    })
    .catch(function (err) {
      //if error
      console.log(err);
      //sends an error to the client
      res.send(false);
    });
  //get all transactions (maybe if we wanted to see what most users spend on??)
  app.get("/api/transaction", function (req, res) {
    db.Transaction.findAll({}).then(function (dbTransaction) {
      res.json(dbTransaction);
    });
  });

  //get all budgets (maybe if we were trying to see a trend)
  app.get("/api/budget", function (req, res) {
    db.Budget.findAll({}).then(function (dbBudget) {
      res.json(dbBudget);
    });
  });

  // //Gets a specific transaction
  app.get("/api/transaction/:id", function (req, res) {
    // Find one Transaction with the transid in req.params.id and return them with res.json
    db.Transaction.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (dbTransaction) {
      res.json(dbTransaction);
    });
  });
    //
  // //Gets a specific user budget
  app.get("/api/budget/:id", function (req, res) {
    // Find a specific user budget with the id in req.params.id and return them with res.json
    db.Budget.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (dbBudget) {
      res.json(dbBudget);
    });
  });
});

module.exports = router;
