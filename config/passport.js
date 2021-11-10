import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/User-model.js";
import { validatePassword } from "../lib/passwordUtils.js";

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }

      console.log(user + "hola");

      const isValid = validatePassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
