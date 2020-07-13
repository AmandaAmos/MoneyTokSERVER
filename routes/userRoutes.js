const db = require ("../models");
const UserSignedIn;

module.exports = function (
    app,
    isAuthenticatedMiddleware,
    isNotAuthenticatedMiddleware
) {
    app.get("/", isAuthenticatedMiddleware(), (req, res) => {
        db.Users.findOne({
            where: { id: req.user.id },
        }).then(async (result) => {
            UserSignedIn = req.user.username;
            res.render("dashboard", {
                userSignedIn: req.user.username,
            });
        });
    });
    app.get("/login", isNotAuthenticatedMiddleware(), (req, res) => {
        res.render("login");
        res.render("transactions");
        res.render("budget");
    });
    app.get("/logout", function (req, res) {
        req.logout();
        req.session.destroy();
        res.render("login");
    });
}