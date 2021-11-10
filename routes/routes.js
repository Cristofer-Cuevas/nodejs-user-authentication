import express from "express";
import controllers from "../controllers/controllers.js";
import passport from "passport";

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

const router = express.Router();

router.get("/", controllers.get);

router.post("/register", controllers.registerPost);

router.post("/login", passport.authenticate("local", { failureRedirect: "/", successRedirect: "/profile" }));

router.get("/profile", ensureAuthenticated, controllers.profile);

export default router;
