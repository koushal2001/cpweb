const router = require("express").Router();
const { add_answer, upvote, downvote, answers } = require("../controllers/answer");
const auth = require("../middleware/auth");


router.post("/", auth, add_answer);
router.post("/up", auth, upvote);
router.post("/down", auth, downvote);
router.get("/list", auth, answers);

module.exports = router;