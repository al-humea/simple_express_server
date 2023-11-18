const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
//CONNECT DB USING MONGOOSE
const model = require("./database");
const mongoose = require('mongoose');
const passport = require("passport");
const uri = "mongodb://localhost/final_secu";
mongoose.connect(uri);

function initialize(passport){
    passport.use(new LocalStrategy({}, async (name, pwd, done)=>{
        let user = await model.find({name:name}).exec();
        //si user pas trouvé
        if (!user.length){
            console.log(`${name} pas dans la bdd`);
            return done(null, false);
        }
        //log user + redirect main page
        bcrypt.compare(pwd, user[0].pwd, function(err, result){
            if (result){
                console.log(`bon mdp login de ${user[0].name}`);
                return done(null, user[0]);
            }
            else {
                console.log(`mauvais mdp pour ${user[0].name}`);
                return done(err, false);
            }
        });
    }));
    passport.serializeUser((user, done)=> done(null, user._id));
    passport.deserializeUser((user, done)=>{
        return done(null, async(id, done)=>{
            let user = await model.findOne({_id:id}).exec();
            done(null, user);
        });
    });
}

module.exports = initialize;