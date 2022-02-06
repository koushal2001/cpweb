const router = require("express").Router();
const passport = require("passport");
const { googlelogin } = require("../controllers/googlelogin");
const { register } = require("../controllers/localregister");

router.route("/").post(register);
module.exports = router;