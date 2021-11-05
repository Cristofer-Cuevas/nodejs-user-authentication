import express from "express";
import controllers from "../controllers/controllers.js";
import passport from "passport";

const router = express.Router();

router.get("/", controllers.get);

router.post("/register", controllers.registerPost);

router.post("/login", controllers.loginPost);

export default router;
