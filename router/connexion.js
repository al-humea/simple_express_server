const express = require("express");
const router = express.Router();
//SESSION
const passport = require("passport");

//Post req
router.get('/', async(req, res)=>{
    res.redirect("/");
});

router.post('/',passport.authenticate("local", {
    successRedirect:"/logged",
    failureRedirect:"/connect"
}));

module.exports = router;