const app = require("./app")
const db = require("./config/database");
require("./passport/googleauth")
require('dotenv').config()
db.connect()
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})