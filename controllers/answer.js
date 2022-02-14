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

exports.answers = async(req, res) => {
    try {
        const qid = req.headers.qid; // to be taken from frontend
        const answers = await answer.find({ "question_id": qid }).sort([
            ["updatedAt", -1]
        ]);
        const result = [];
        for (var ans in answers) {
            result.push({
                id: answers[ans]._id,
                description: answers[ans].description,
                solution: answers[ans].solution,
                user: await User.findById(answers[ans].user_id),
                upvote: answers[ans].upvote.length,
                downvote: answers[ans].downvote.length,
            })
        }
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

exports.answerbyid = async(req, res) => {
    try {
        const ansid = req.headers.ansid; // to be taken from frontend

        const thisanswer = await answer.findById(ansid);
        const result = {
            id: thisanswer._id,
            url: thisanswer.url,
            description: thisanswer.description,
            buggycode: thisanswer.buggycode,
            tags: thisanswer.tags,
            user: await User.findById(thisanswer.user_id),
            upvote: thisanswer.upvote.length,
            downvote: thisanswer.downvote.length,
        };
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

// exports.addcomment = async(req, res) => {
//     try {
//         const user_id = req.id;
//         const answer_id = req.body.answer_id; // to be sent from qurey or header
//         const commentbody = req.body.comment; // to be sent in body
//         if (!comment) {
//             return res.send("Comment Body empty");
//         }
//         const ans = await answer.findById(answer_id);
//         ans.comment.push(commentbody);
//         await ans.save();
//         return res.send("Comment added");

//     } catch (err) {
//         return res.status(500).json({ msg: err.message });
//     }
// }
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