const router = require("express").Router();
const passport = require("passport");
const { locallogin } = require("../controllers/localogin")
const { googlelogin, callback } = require("../controllers/googlelogin");

router.get("/google", passport.authenticate('google', {
    scope: ['profile', 'email']
}), googlelogin);

router.get("/google/callback", passport.authenticate('google'), callback)

router.route("/locallogin").post(locallogin);
module.exports = router;