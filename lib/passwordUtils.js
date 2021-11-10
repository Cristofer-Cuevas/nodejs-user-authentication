import crypto from "crypto";
import User from "../models/User-model.js";
import passport from "passport";

export const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};

export const validatePassword = (password, hash, salt) => {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === hashVerify;
};

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  User.findById({ _id: userId }, (err, user) => {
    console.log(user);
    done(null, user);
  });
});
