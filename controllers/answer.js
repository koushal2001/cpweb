const answer = require("../models/answer");
const question = require("../models/answer");
const { findById } = require("../models/user");
const User = require("../models/user");

exports.add_answer = async(req, res) => {
    try {
        const { description, solution } = req.body;
        if (!description) {
            return res.status(400).send("Please enter description");
        }
        const user_id = req.id;
        const ques_id = req.body.question_id; // to be sent from body headers or something
        // console.log(req.body, ques_id);
        new_answer = new answer({
            description,
            solution,
            user_id,
            question_id: ques_id,
        });
        await new_answer.save();
        return res.send("answer saved");

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }

};
exports.upvote = async(req, res) => {
    try {
        const user_id = req.id;
        const answer_id = req.body.answer_id; // to be sent from qurey or header
        const ans = await answer.findById(answer_id);
        const upcheck = ans.upvote.find(user => user == user_id);
        if (upcheck) {
            return res.send("Already upvoted by the user");
        }
        const downcheck = ans.downvote.find(user => user == user_id);
        if (downcheck) {
            await answer.updateOne({
                _id: answer_id
            }, {
                $pull: {
                    downvote: user_id,
                },
            });
        }
        ans.upvote.push(user_id);
        await ans.save();
        res.send("upvoteadded");

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}
exports.downvote = async(req, res) => {
    try {
        const user_id = req.id;
        const answer_id = req.body.answer_id; // to be sent from qurey or header
        const ans = await question.findById(answer_id);
        const check = ans.downvote.find(user => user == user_id);
        if (check) {
            return res.send("Already downvoted by the user");
        }
        const upcheck = ans.upvote.find(user => user == user_id);
        if (upcheck) {
            await answer.updateOne({
                _id: answer_id
            }, {
                $pull: {
                    upvote: user_id,
                },
            });
        }
        ans.downvote.push(user_id);
        await ans.save();
        res.send("downvoteadded");

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}