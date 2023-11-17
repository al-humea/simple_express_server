const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//CONNECT DB USING MONGOOSE
const model = require("../database");
const mongoose = require('mongoose');
const uri = "mongodb://localhost/final_secu";
mongoose.connect(uri);
//HTTPS

//Post req
router.get('/', async(req, res)=>{
    res.redirect("/");
});

router.post('/', async(req, res)=>{
    if (!req.body.nom || !req.body.password) return;//renvoyer erreur manque mdp ou nom
    let user = await model.find({name:req.body.nom}).exec();
    if (!user.length){//si user pas trouvé
        return;//renvoyer erreur mdp ou id
    }
    bcrypt.compare(req.body.password, user[0].pwd, function(err, result) {
        if (result){
            res.redirect("/");//log user + redirect main page
        }
        else{
            return;//renvoyer erreur mdp ou id
        }
    });
});

module.exports = router;