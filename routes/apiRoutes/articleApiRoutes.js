///Dependencies
//======================================================
const db = require("../../models");
const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

//create the scraping function
const databaseUrl = "scraper";
const articles = ["scrapedArticles"];


//scrape data from one site and send to MySQL
app.get("/articles", function(req, res) {
  //make axios request from personal finance section of 30underMoney
  axios.get("https://www.moneyunder30.com/category/personal-finance")
    .then(function(response) {
      //load the html body from axios into cheerio
      const $ = cheerio.load(response.data);
      //for each element with a "title" class
      $(".title").each(function(i, element) {
        //save the text and href of each link
        const title = $(element).children("a").text();
        const link = $(element).children("a").attr("href");
        const byline = $(element).children("a").text("p");

        //if this foudn element has both title, link, and byline
        if (title && link && byline) {
          //insert data into articledb
          db.articles.insert({
            title: title,
            link: link,
            byline: byline
          },
          function(err, inserted) {
            if (err) {
              //log the error if one is encountered during the query
              console.log(err);
            } else {
              //otherwise, log the inserted data
              console.log(inserted);
            };
          });
        };
      });
    });
});
app.post("./article", function(req, res) {
  //post to article page
})











function buildQueryURL() {
  const queryURL = "https://rss.nytimes.com/services/xml/rss/nyt/YourMoney.xml";

  // const queryParams = { "api-key": "Ignltr55QUk2vetNt9sWdfnOBJoUPWnG" };

  axios({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}
//Routes
//=========================================================

//Matches with "/api/article"
router.get("/", function (req, res) {
  //   db.article.findAll({}).then(function (dbarticle) {
  //     res.json(dbarticles);
  //   });
  buildQueryURL();
});

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

//
router.post("/", function (req, res) {
  db.user
    .create({
      title: req.body.title,
      byline: req.body.byline,
      link: req.body.lin
    })
    .then(function (user) {
      // send back the user id to client
      res.json(user.id);
      console.log("Here are the articles!");
    })
    .catch(function (err) {
      //if error
      console.log(err);
      //sends an error to the client
      res.send(false);
    });
});

module.exports = router;