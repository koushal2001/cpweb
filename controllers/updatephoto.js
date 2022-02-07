const { findById } = require("../models/user");
const User = require("../models/user")
const cloudinary = require("cloudinary").v2;

exports.updatephoto = async(req, res) => {


    try {
        let result;
        const user = await User.findById(req.id);
        if (!user) {
            res.send("Invalid User");
        }

        const image_id = user.photo.id;
        if (image_id != "01") {
            await cloudinary.uploader.destroy(image_id, function(err, res) {
                console.log(err, res);
            });
        }
        if (!req.files) {
            // result.public_id = 01;
            // result.secure_url = "https://res.cloudinary.com/cpweb2022/image/upload/v1644218519/users/dummy-avatar-300x300_iqvli1.jpg"
            console.log("Default picture would be used"); // Raise an message or alert.
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
        await user.update({
            photo: {
                id: result.public_id,
                secure_url: result.secure_url,
            }
        })

        return res.send("image updated");

    } catch (error) {
        console.log(error);
    }

};