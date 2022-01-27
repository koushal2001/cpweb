const mongoose = require("mongoose");
const { Schema } = mongoose;

const question = new Schema({
    url: {
        type: String,
        unique: true,
    },
    buggycode: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        enum: ['Array', 'Binary Search', 'Other'] // more to be added
    },
    user_id: {
        type: String,
        required: true,
    },
    upvote: {
        type: String,
    },
    downvote: {
        type: String,
    }
});
module.exports = mongoose.model("question", question);