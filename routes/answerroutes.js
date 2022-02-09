const router = require("express").Router();
const { add_answer, upvote, downvote } = require("../controllers/answer");
const auth = require("../middleware/auth");


router.post("/", auth, add_answer);
router.post("/up", auth, upvote);
router.post("/down", auth, downvote);


module.exports = router;