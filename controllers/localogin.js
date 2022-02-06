const User = require("../models/user")

exports.locallogin = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const isMatch = await user.validatepassword(password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        //sign jwt token
        const token = await user.gettoken();
        return res.json(token);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }

};