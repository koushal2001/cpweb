const express = require("express");
const fileupload = require("express-fileupload");
const cookiesession = require("cookie-session");
const passport = require("passport");
require('dotenv').config()
const app = express();
const auth = require("./middleware/auth");
app.use(passport.initialize());
app.use(cookiesession({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIETOKENKEY],
}))
app.use(passport.session());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use(express.json()) // json desconstruter

const signup = require("./routes/signuproute");
const login = require("./routes/loginroutes");
const update = require("./routes/updateroutes");
const question = require("./routes/questionroutes");
const answer = require("./routes/answerroutes");
app.use("/register", signup);
app.use("/login", login);
app.use("/update", update);
app.use("/question", question);
app.use("/answer", answer)
    // app.get("/testprivate", auth, (req, res) => {
    //     res.send("test  private route");
    // })
module.exports = app;