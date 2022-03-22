const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const initializePassport = require("../config/passport");
const { checkNotAuthenticated } = require("../middlewares/checkAuth");

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

let users = [];

router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("Login.ejs");
});

router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

router.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

router.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const id = Math.random();
    const hashPass = await bcryptjs.hash(password, 10);
    users.push({
      id,
      name,
      email,
      password: hashPass,
    });
    console.log(users);
    res.redirect("/users/login");
  } catch (error) {
    res.redirect("/users/register");
  }
});

router.delete("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});

module.exports = router;
