const app = require("./app")
const db = require("./config/database");
const cloudinary = require("cloudinary").v2;
require("./passport/googleauth")
require('dotenv').config()
db.connect()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})