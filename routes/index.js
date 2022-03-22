const { checkAuthenticated } = require("../middlewares/checkAuth");

const router = require("express").Router();

router.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

module.exports = router;
