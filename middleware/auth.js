const jwt = require("jsonwebtoken");
const auth = async(req, res, next) => {
    try {
        const header = req.header("Authorization");
        if (!header) {
            return res.status(401).json({ msg: "Invalid Token" });
        }

        const decoded = await jwt.verify(header, (process.env.SECRET_KEY));
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = auth;