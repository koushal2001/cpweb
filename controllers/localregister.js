const User = require("../models/user")
const cloudinary = require("cloudinary").v2;

exports.register = async(req, res) => {
    const { email, first_name, last_name, password } = req.body;

    if (!password) {
        res.send("password required") // need to implement error class to raise custom or default errors needs to be done
    }
    const user = await User.findOne({
        // email: profile._json.email
        email:email
    })
    if (user) {
        console.log("already exixts user");
        return res.json({ msg: "user laready exists" });
    }
    try {

        let result;
        if (!req.files) {
            // result.public_id = 01;
            // result.secure_url = "https://res.cloudinary.com/cpweb2022/image/upload/v1644218519/users/dummy-avatar-300x300_iqvli1.jpg"
        } else {
            result = await cloudinary.uploader.upload(req.files.photo.tempFilePath, {
                folder: "users",
                crop: "scale",
            })
        }
        if (!result) {
            result = {
                public_id: "01",
                secure_url: "https://res.cloudinary.com/cpweb2022/image/upload/v1644218519/users/dummy-avatar-300x300_iqvli1.jpg"
            }
        }
        const newuser = new User({
            email,
            first_name,
            last_name,
            password,
            photo: {
                id: result.public_id,
                secure_url: result.secure_url,
            }
        })
        const jwt = await newuser.gettoken();
        await newuser.save();
        return res.json({
            jwt: jwt,
            user: newuser
        });

    } catch (error) {
        console.log(error);
    }

};