const mongoose = require("mongoose");

const schemaUtilisateur = new mongoose.Schema({
    name: String,
    pwd : String
});
const uri = "mongodb://localhost/final_secu";
mongoose.connect(uri);
module.exports = mongoose.model("Utilisateur", schemaUtilisateur);