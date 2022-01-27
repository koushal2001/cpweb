const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var crypto = require("crypto");
const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail],
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },

    password: {
        type: String,
    },
    photo: {
        id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    forgotpassword: {
        type: String,
    },
    forgotpasswordexpiry: {
        type: Date,
    }


}, { timestamps: true })

//encypt password before save
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 5);
})

userSchema.methods.validatepassword = async function(userpassword) {
    return await bcrypt.compare(userpassword, this.password)
}

userSchema.methods.gettoken = async function() {
    return jwt.sign({
        id: this._id
    }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRY,
    });
}


userSchema.methods.forgottoken = async function() {
    const forgot = crypto.randomBytes(20).toString('hex');
    this.forgotpassword = crypto.createHash('sha256').update(forgot).digest('hex');

    this.forgotpasswordexpiry = Date.now() + 20 * 60 * 1000;
    return forgot;
}


module.exports = mongoose.model('User', userSchema);