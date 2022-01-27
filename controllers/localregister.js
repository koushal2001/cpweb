const User = require("../models/user")

exports.register = async(req, res) => {
    const { email, first_name, last_name, password } = req.body;
    if (!password) {
        res.send("password reuqired") // need to implement error class to raise custom or default errors needs to be done
    }
    const newuser = await User.create({
        email,
        first_name,
        last_name,
        password
        //photo needs to be implemented
    }).then(() => {
        res.send("user Registered");
    }).catch((error) => {
        console.log(error);
    })
};