import express from "express";
import controllers from "../controllers/controllers.js";

const router = express.Router();

router.get("/", controllers.get);

export default router;
