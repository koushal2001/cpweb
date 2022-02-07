const question = require("../models/question");
const User = require("../models/user");
exports.add_question = async(req, res) => {
    try {
        const { url, buggycode, description, tags } = req.body;
        if (!url || !description) {
            return res.status(400).send("Please enter url for the question and description");
        }
        const user_id = req.id;
        new_question = new question({
            url,
            buggycode,
            description,
            tags,
            user_id
        });
        await new_question.save();
        return res.send("question saved");

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }

};
exports.upvote = async(req, res) => {

}
exports.downvote = async(req, res) => {

}