const locatStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (!user) {
      return done(null, false, { message: "No user with this email" });
    }

    try {
      if (await bcryptjs.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "password wrong for that email" });
      }
    } catch (error) {
      return done(error.message);
    }
  };

  passport.use(new locatStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

module.exports = initialize;
