const mongoose = require("mongoose");
const { MONGO_ONLINE } = process.env;
exports.connect = () => {
    mongoose.connect(MONGO_ONLINE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(
            console.log(`DB connected Succefully`)
        )
        .catch(error => {
            console.log(`DB connection Failed`);
            console.log(error);
            process.exit(1);
        })
}