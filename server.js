import express from "express";
import session from "express-session";
import cors from "cors";
import dontenv from "dotenv";
import router from "./routes/routes.js";
import dbConnection from "./dbConnection/dbConnection.js";
import MongoStore from "connect-mongo";
import passport from "passport";

import "./config/passport.js";

const app = express();
dontenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Passport funcs
app.use(passport.initialize());
app.use(passport.session());

dbConnection(() => {
  app.use(router);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);
