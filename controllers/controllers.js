import User from "../models/User-model.js";
import passport from "passport";

const controllers = {};

controllers.get = (req, res, next) => {
  res.send(`<h1>User Athentication</h1>
  <div>
  <h2>Register Form</h2>
    <form action='/register' method='POST' >
      <label for='username' >User Name</label>
      <input type='text' id='username' name='username'/>
      <label for='password'>Password</label>
      <input type'text' id='password' name='password'/>
      <button type='sumbit'>Send</button>
    </form>
  </div>


  <div >
  <h2 form='loginPost' >Login Form</h2>
    <form action='/login' method='POST'>
        <label for='username'>User Name</label>
        <input type='text' id='username' name='username' />
        <label for='password'>Possword</label>
        <input type='text' id='password' name='password' />
        <button type='submit'>Send</button>
    </form>
  </div>
  `);
};

controllers.registerPost = async (req, res, nex) => {
  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;

  User.find({ username }, (username) => {
    if (username) {
      res.send("Username already exists. If it you plese go to the login session.");
    } else {
      User.create({ username, password });
    }
  });

  res.redirect("/");
};

(controllers.loginPost = passport.authenticate("local")),
  (req, res, next) => {
    console.log(req.body);
    res.redirect("/profile");
  };

export default controllers;
