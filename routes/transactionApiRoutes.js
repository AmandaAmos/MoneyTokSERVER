const db = require("../models");


module.exports = function(app) {
    app.get("./models/transaction", function(req, res) {
        db.transaction.findAll({
            where: { id: req.user.Transaction},
        }).then(async (result) => {
            res.render("transaction")
        });
    });
    //GET route for calling deposit, withdrawal, total
    app.get("./models/transaction", function(req, res) {
        db.transaction.findAll({
            where: {
                deposit: req.params.deposit
            }
        })
        .then(function(dbtransaction) {
            res.render("transaction", {
                deposit: req.transaction.deposit
            });
        }); 
    });

    app.get("./models/transaction.js", function(req, res) {
        db.transaction.findAll({
            where: {
                withdrawal: req.params.withdrawal
            }
        })
        .then(function(dbTransaction) {
            res.render("transaction", "dashboard");
        }); 
    });app.get("./models/transaction.js", function(req, res) {
        db.Transaction.findAll({
            where: {
                total: req.params.total
            }
        })
        .then(function(dbTransaction) {
            res.render("transaction", "dashboard");
        }); 
    });

    //POST route for saving transaction
    app.post("./models/", function(req, res) {
        console.log(req.body);
        db.Transaction.create({
            description: req.body.description,
            note: req.body.note,
            deposit: req.body.deposit,
            withdrawal: req.body.withdrawal,
            total: req.body.total

        })
        .then(function(dbTransaction) {
            res.json(dbTransaction);
        });
    });

    //PUT route for updating transaction
    app.put(".models/transactions.js", function (res,req) {
        db.Transaction
          .update(req.body, {
              where: {
                  id: req.body.id,
              },
          })
          .then(function (dbTransaction) {
              res.json(dbTransaction);
          })
    });

    //DELETE route for deleting a transaction
    app.delete("./models/tranaction", function (req, res) {
        db.Transaction.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then(function (dbTransaction) {
            res.json(dbTransaction);
        });
    });
 
};


  