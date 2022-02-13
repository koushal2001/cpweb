const router = require("express").Router();
const { add_question, upvote, downvote, questions, questionbyid } = require("../controllers/question");
const auth = require("../middleware/auth");


router.post("/", auth, add_question);
router.post("/up", auth, upvote);
router.post("/down", auth, downvote);
router.get("/list", questions);
router.get("/listone", questions);


module.exports = router;