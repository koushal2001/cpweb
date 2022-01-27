const mongoose = require("mongoose");
const { MONGO_LOCAL } = process.env;
exports.connect = () => {
    mongoose.connect(MONGO_LOCAL, {
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