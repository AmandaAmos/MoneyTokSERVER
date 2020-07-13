const db = require("../models");
const crypto = require("crypto-js");
const nodemailer = require("nodemailer");

module.exports = function (
    app,
    passport,
    isAuthenticatedMiddleware, 
    isNotAuthenticatedMiddleware
) {
    app.post("/login", isNotAuthenticatedMiddleware(), (req,res) => {
        db.Users.findOne({
            where: { username: req.body.username },
        }).then(async (result) => {
            if(!result) {
                return res.send(false);
            }
            try{
                if (
                    await crypto.compare(req.body.password, result.dataValues.password)
                ){
                    req.login(
                        {username: result.dataValues.username, id: result.dataValues.id },
                        function (err) {
                            if (err) throw err;
                            res.send(true);
                        }
                    );
                } else {
                    res.send(false);
                }
            } catch {
                res.status(500).end();
            }
        });
        passport.serializeUser(function (user_Name, done) {
            done(null, user_Name);
        });
        passport.deserializeUser(function(user_Name, done) {
            done(null, user_Name);
        });
    });

    app.post("/NewUser", isAuthenticatedMiddleware(), async (req,res) => {
        const hashedPassword = await crypto.HmacSHA512(req.body.password, 8);
        db.Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            balance: req.body.balance,
            username: req.body.username,
            password: hashedPassword,
        })
        .then(() => {
            res.send(true);
        })
        .catch((err) => {
            err.errors[0].message.includes("Username and Email must be unique")
            ? res.send("User Already Exists")
            : res.send(false);
        });
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL,
                pass: GMAILPASSWORD,
            }
        });
        let mailOptions = {
            from: '"MoneyTok" <no-reply@moneytok.com>',
            to: req.body.email,
            subject: "MoneyTok",
            text: "Welcome to MoneyTok! Click the link below to verify your email address and log into your new account.",
            html: "<b>https://amandaamos.github.io/MoneyTok/</b>",
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.log(error);
            } else {
                console.log(`Email sent: ${(info.response)}`);
            }
        });
    });
};