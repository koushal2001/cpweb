const User = require("../models/user")
exports.googlelogin = async(req, res) => {
    res.send("login with google")
};

exports.callback = async(req, res) => {
    const jwt = await req.user.gettoken();
    return res.json({
        jwt: jwt,
        user: req.user
    });
}