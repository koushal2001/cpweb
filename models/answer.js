const mongoose = require("mongoose");
const { Schema } = mongoose;

const answer = new Schema({
    description: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        //prefilled with buggy code
    },
    user_id: {
        type: String,
        required: true,
    },
    question_id: {
        type: String,
        required: true,
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        required: true
    }]
});
module.exports = mongoose.model("answer", answer);