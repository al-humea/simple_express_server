const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//CONNECT DB
const model = require("../database");
const mongoose = require('mongoose');
const uri = "mongodb://localhost/final_secu";
mongoose.connect(uri);

//ROUTES
router.get('/', async(req, res)=>{
    res.redirect("/");
});
router.post('/', async(req, res)=>{
    //si manque mdp ou pwd ne rien faire
    if (!req.body.username || !req.body.password) return;//renvoyer erreur manque mdp ou nom
    let user = await model.find({name:req.body.username}).exec();
    if (!user.length){//if user not in db
        try {
            let hashPass = await bcrypt.hash(req.body.password, 10);
            let nouvel_utilisateur = new model({
                name: req.body.username,
                pwd: hashPass
            });
            nouvel_utilisateur.save();
            console.log("Nouvel utilisateur créé.");
            //+msg succès + mise page login
        }catch(e){
            //+msg retry
            res.status(500).redirect("/");
            throw(e);
        }
    }
    else {
        res.status(503).redirect("/");
        //+msg user déjà présent dans la db
    }
});

module.exports = router;