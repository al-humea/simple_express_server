// SERVER PARAMETRES
const {readFile} = require("fs").promises;
const fs = require("fs");
const express = require("express");
const app = express();
const https = require("https");
const port = 443;//HTTPS PORT
// SSL
const sslServerOptions = {
    key: fs.readFileSync('./cert.key'),
    cert: fs.readFileSync('./cert.crt')
};
// HTTPS server setup
const httpsServer = https.createServer(sslServerOptions, app);
// Start HTTPS server
httpsServer.listen(port, () => {
    console.log(`HTTPS Server running on port ${port}`);
});

//MIDDLEWARE POUR GERER DOSSIER PUBLIC AVEC IMAGE
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
//MIDDLEWARE
app.use(express.urlencoded({ extended: true}));
// ROUTER
const routerCon = require("./router/connexion");
const routerReg = require("./router/inscription");
app.use("/connect", routerCon);//routes connexion
app.use("/inscription", routerReg);//routes inscription

app.get('/', async (req, res)=>{
    res.send(await readFile("./index.html", "utf8"));
});

app.get("/*", async(req, res)=>{
    res.status(404).send(await readFile("./404.html", "utf8"));
});
