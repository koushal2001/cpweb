const question = require("../models/question");
const { findById } = require("../models/user");
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
    try {
        const user_id = req.id;
        const question_id = req.body.question_id; // to be sent from qurey or header
        const que = await question.findById(question_id);
        const upcheck = que.upvote.find(user => user == user_id);
        if (upcheck) {
            return res.send("Already upvoted by the user");
        }
        const downcheck = que.downvote.find(user => user == user_id);
        if (downcheck) {
            await question.updateOne({
                _id: question_id
            }, {
                $pull: {
                    downvote: user_id,
                },
            });
        }
        que.upvote.push(user_id);
        await que.save();
        res.send("upvoteadded");

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}
exports.downvote = async(req, res) => {
    try {
        const user_id = req.id;
        const question_id = req.body.question_id; // to be sent from qurey or header
        const que = await question.findById(question_id);
        const check = que.downvote.find(user => user == user_id);
        if (check) {
            return res.send("Already downvoted by the user");
        }
        const upcheck = que.upvote.find(user => user == user_id);
        if (upcheck) {
            await question.updateOne({
                _id: question_id
            }, {
                $pull: {
                    upvote: user_id,
                },
            });
        }
        que.downvote.push(user_id);
        await que.save();
        res.send("downvoteadded");

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}