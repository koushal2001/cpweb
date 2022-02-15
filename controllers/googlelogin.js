const User = require("../models/user")
exports.googlelogin = async(req, res) => {
    res.send("login with google")
};

exports.callback = async(req, res) => {
    const jwt = await req.user.gettoken();
    console.log("fcdnjc", req.user, "dnckj");
    res.redirect("http://localhost:3000/token=" + jwt);
}
