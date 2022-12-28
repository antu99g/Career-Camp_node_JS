const User = require('../models/user');


// Rendering login-page
module.exports.loginForm = function (req, res) {
   if (req.isAuthenticated()) {
      return res.redirect("back");
   }
   return res.render("user_login", { layout: false });
};


// Rendering signup-page
module.exports.signupForm = function (req, res) {
   if (req.isAuthenticated()) {
      return res.redirect("back");
   }
   return res.render("user_signup", { layout: false });
};


// After creating new session
module.exports.createSession = function (req, res) {
   return res.redirect('/');
};


// Adding new user
module.exports.signUp = async function (req, res) {
   try {
      if (req.body.password != req.body.confirmPassword) {
         return res.redirect("back");
      }

      let user = await User.findOne({ employeeId: req.body.employeeId });

      if (!user) {
         await User.create(req.body);
      }
      return res.redirect("/user/log-in");

   } catch (err) {
      console.log("Error in adding a user", err);
      return res.redirect("back");
   }
};


// Logging out
module.exports.logOut = function (req, res) {
   req.logout(function (err) {
      if (err) {
         console.log("Error in logging out");
         return res.redirect("back");
      }
      return res.redirect("/user/log-in");
   });
};