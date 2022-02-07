const router = require("express").Router();
const { add_question } = require("../controllers/question");
const auth = require("../middleware/auth");


router.post("/", auth, add_question);


module.exports = router;