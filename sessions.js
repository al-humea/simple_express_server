const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
//CONNECT DB USING MONGOOSE
const model = require("./database");
const mongoose = require('mongoose');
const passport = require("passport");
const uri = "mongodb://localhost/final_secu";
mongoose.connect(uri);

async function authenticateUser(name, pwd, done){
    let user = await model.find({name:name}).exec();
    //si user pas trouvé
    if (!user.length) return done(null, false);
    //log user + redirect main page
    bcrypt.compare(pwd, user[0].pwd, function(err, result){
        if (result) return done(null, user);
        else return done(err, false);
    });
}

function initialize(passport){
    passport.use(new LocalStrategy({}, authenticateUser));
    passport.serializeUser((user, done)=>{});
    passport.deserializeUser((user, done)=>{});
}

module.exports = initialize;