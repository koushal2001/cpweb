const { randomFill } = require("crypto");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { Schema } = mongoose;
const question = new Schema({
    url: {
        type: String,
        required: true,
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
    upvote: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    // comment: [{
    //     type: String
    // }]
}, { timestamps: true });




module.exports = mongoose.model("question", question);