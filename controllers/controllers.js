import User from "../models/User-model.js";
import passport from "passport";
import { genPassword } from "../lib/passwordUtils.js";

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

controllers.registerPost = (req, res, next) => {
  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;

  const hash = genPassword(password);

  User.findOne({ username }, (err, user) => {
    if (err) {
      res.redirect("/profile");
    }

    if (user) {
      res.send(`<h1>Username already exists. If it's you please go to the login session.</h1> <br> <a href='/'>Home</a>`);
    } else {
      User.create({ username: username, hash: hash.hash, salt: hash.salt }, (err, data) => {
        console.log(username);
        if (err) {
          res.redirect("/login");
        } else {
          console.log(data);
          next(null, data);
        }
      });
    }
  });
};

controllers.profile = (req, res) => {
  console.log(req);
  res.send(`<h1>${req.user.username}</h1>`);
};

export default controllers;
