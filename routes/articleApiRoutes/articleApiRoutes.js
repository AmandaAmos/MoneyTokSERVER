///Dependencies
//======================================================
const db = require("../../models");
const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

//create the scraping function
const databaseUrl = "scraper";
const articles = ["scrapedArticles"];

module.exports = function () {
  //scrape data from one site and send to MySQL
  app.get("/articles", function (req, res) {
    //make axios request from personal finance section of 30underMoney
    axios
      .get("https://www.moneyunder30.com/category/personal-finance")
      .then(function (response) {
        //load the html body from axios into cheerio
        const $ = cheerio.load(response.data);
        //for each element with a "title" class
        $(".title").each(function (i, element) {
          //save the text and href of each link
          const title = $(element).children("a").text();
          const link = $(element).children("a").attr("href");
          const byline = $(element).children("a").text("p");

          //if this foudn element has both title, link, and byline
          if (title && link && byline) {
            //insert data into articledb
            db.articles.insert(
              {
                title: title,
                link: link,
                byline: byline,
              },
              function (err, inserted) {
                if (err) {
                  //log the error if one is encountered during the query
                  console.log(err);
                } else {
                  //otherwise, log the inserted data
                  console.log(inserted);
                }
              }
            );
          }
        });
      });
  });

  //add article to article page
  app.post("./article", function (req, res) {
    console.log("Articles");
    console.log(req.body);

    const dbQuery =
      "INSERT INTO articles (title, byline, link) VALUES (?,?,?,)";
    connection.query(
      dbQuery,
      [req.body.title, req.body.byline, req.body.link],
      function (err, results) {
        if (err) throw err;
        console.log("Article Saved!");
        res.end();
      }
    );
  });
};
