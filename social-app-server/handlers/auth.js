const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function name(req, res, next) {

    // find a user with his unique email address
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        // compare the password provided (after encrypting it) to the encrypted password stored in the database
        let { id, username, profileImageUrl, messages } = user;
        let isMatch = await user.comparePassword(req.body.password);
        // if email and password are there create signin token and return it along with the users data
        if (isMatch) {
            let token = jwt.sign({
                id: id,
                username: username,
                profileImageUrl
            }, process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token,

            })
        } else {
            return next({
                status: 400,
                message: "invalid email/password"  //if password or email are wrong , show error
            });
        }

    } catch (error) {
        return next({
            status: 400,
            message: "invalid email/password"
        });
    }

}
exports.signup = async function (request, res, next) {

    try {
        let user = await db.User.create(request.body);   //create a new user in database
        let { id, email, username, password } = user;
        let token = jwt.sign({  //create a token for the user
            id,
            email,
            username
        },
            process.env.SECRET_KEY
        );
        return res.status(200).json({ //return new user data
            id,
            username,
            token,
            password
        })
    } catch (err) {
        if (err.code === 11000) {
            err.message = "sorry, username/email are token";
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}