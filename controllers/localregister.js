const User = require("../models/user")

exports.register = async(req, res) => {
    const { email, first_name, last_name, password } = req.body;
    if (!password) {
        res.send("password required") // need to implement error class to raise custom or default errors needs to be done
    }
    try {
        const newuser = new User({
            email,
            first_name,
            last_name,
            password
            //photo needs to be implemented
        })
        const jwt = await newuser.gettoken();
        await newuser.save();
        return res.json(jwt);

    } catch (error) {
        console.log(error);
    }

};