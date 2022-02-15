const User = require("../models/user")
exports.googlelogin = async(req, res) => {
    res.send("login with google")
};

exports.callback = async(req, res) => {
    const jwt = await req.user.gettoken();
    const user = req.user;
    res.redirect("http://localhost:3000/token=" + jwt + "/email=" + user.email + "/firstname=" + user.first_name + "/lastname=" + user.last_name + "/id=" + user._id + "/photo=" + user.photo.secure_url);
}