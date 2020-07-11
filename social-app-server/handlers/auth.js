const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = function name(params) {

    try {
        let user =  db.user.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        let isMatch =  user.comparePassword(req.body.password);
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
                token
            })
        } else {
            return next({
                status: 400,
                message: "invalid email/password"
            });
        }

    } catch (error) {
        return next({
            status: 400,
            message: "invalid email/password"
        });
    }

}
exports.signup = async function (req, res, next) {
    try {
        let user =  db.user.create(req.body);
        let { id, username, profileImageUrl } = user;
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
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