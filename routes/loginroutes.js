const router = require("express").Router();
const passport = require("passport");
const { googlelogin, callback } = require("../controllers/googlelogin");

router.get("/google", passport.authenticate('google', {
    scope: ['profile', 'email']
}), googlelogin);

router.get("/google/callback", passport.authenticate('google'), callback)
module.exports = router;