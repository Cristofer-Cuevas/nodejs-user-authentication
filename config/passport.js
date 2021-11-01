import passport from "passport";
// import LocalStrategy from `passport-local`.Strategy();
import LocalStrategy from "passport-local";
import User from "../models/User-model.js";

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
