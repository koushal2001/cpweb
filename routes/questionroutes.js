const router = require("express").Router();
const { add_question, upvote, downvote } = require("../controllers/question");
const auth = require("../middleware/auth");


router.post("/", auth, add_question);
router.post("/up", auth, upvote);
router.post("/down", auth, downvote);


module.exports = router;