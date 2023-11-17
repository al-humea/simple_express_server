// BASE LOAD
const {readFile} = require("fs").promises;
const fs = require("fs");
const express = require("express");
const app = express();

// HTTPS server setup
const https = require("https");
const port = 443;//HTTPS PORT
const sslServerOptions = {
    key: fs.readFileSync('./cert.key'),
    cert: fs.readFileSync('./cert.crt')
};
const httpsServer = https.createServer(sslServerOptions, app);
httpsServer.listen(port, () => {
    console.log(`HTTPS Server running on port ${port}`);
});
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: true}));

//SESSION
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const sessionInit = require("./sessions.js");
sessionInit(passport);
app.use(flash());
app.use(session({
    secret: fs.readFileSync('./sec.key'),
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
const routerCon = require("./router/connexion");
const routerReg = require("./router/inscription");
app.use("/connect", routerCon);//routes connexion
app.use("/inscription", routerReg);//routes inscription

app.get('/', async (req, res)=>{
    res.send(await readFile("./index.html", "utf8"));
});
app.get('/logged', async (req, res)=>{
    res.send(await readFile("./logged.html", "utf8"));
});

app.get("/*", async(req, res)=>{
    res.status(404).send(await readFile("./404.html", "utf8"));
});

