const db = require("../../models");
const articleApiRoutes = require("./articleApiRoutes");
const router = require("express").Router();
const axios = require("axios");

// Routes
// =============================================================
module.exports = function (app) {
  //GET route for retrieving savedArticles
  app.get("./models/userarticle.js", function (req, res) {
    db.Post.findAll({}).then(function (dbsavedArticles) {
      res.json(dbsavedArticles);
    });
  });

  //PUT route for updating posts
  app.put("./models/userarticle.js", function (res, req) {
    db.savedArticles
      .update(req.body, {
        where: {
          id: req.body.id,
        },
      })
      .then(function (dbsavedArticles) {
        res.json(dbsavedArticles);
      });
  });

  //DELETE route for deleting a saved article
  app.delete("./models/userarticle/js", function (req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbsavedArticles) {
      res.json(dbsavedArticles);
    });
  });
};
