const router = require("express").Router();
const { updatephoto } = require("../controllers/updatephoto");
const auth = require("../middleware/auth");

router.post("/photo", auth, updatephoto);
module.exports = router;