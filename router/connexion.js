const express = require("express");
const router = express.Router();
//SESSION
const passport = require("passport");

//Post req
router.get("/", async(req, res)=>{
    res.redirect("/");
});
router.get("/logged", async(req, res)=>{
    res.redirect("/logged");
});

router.post('/',passport.authenticate("local", {
    failureRedirect:"/",
    successRedirect:"/logged"}
    )
);

module.exports = router;