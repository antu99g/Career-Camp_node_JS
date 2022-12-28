const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({usernameField: "employeeId"},

   function (employeeId, password, done) {
      User.findOne({ employeeId: employeeId }, function (err, user) {
         if (err) {
            console.log("Error in finding user");
            return done(err);
         }
         if (!user || user.password != password) {
            console.log("Invalid username or password");
            return done(null, false);
         }
         return done(null, user);
      });
   }
));


passport.serializeUser(function(user, done){
   done(null, user.id);
})


passport.deserializeUser(function(id, done){
   User.findById(id, function(err, user){
      if(err){
         console.log("Error in finding user");
         return done(err);
      }
      return done(null, user);
   });
})


passport.checkAuthentication = function (req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   return res.redirect('/user/log-in');
}



module.exports = passport;