const passport = require("passport");
const { CLIENTID, CLIENTSECRET } = process.env;
const User = require("../models/user");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: CLIENTID,
        clientSecret: CLIENTSECRET,
        callbackURL: "http://localhost:3000/login/google/callback"
    },
    (accessToken, refresfToken, profile, next) => {
        console.log(profile);
        User.findOne({
            email: profile._json.email
        }).then(user => {
            if (user) {
                console.log("already exixts user");
                return next(null, user);
            } else {
                User.create({
                        email: profile._json.email,
                        first_name: profile._json.given_name,
                        last_name: profile._json.family_name,
                        photo: {
                            secure_url: profile._json.picture,
                            id: "01",
                        },
                    }).then(user => {
                        console.log("user created");
                        return next(null, user);
                    })
                    .catch(err => {
                        console.log(err);
                        return;
                    })
            }
        });
    }

));