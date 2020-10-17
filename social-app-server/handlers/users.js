const db = require('../models');

exports.getUser = async function (req, res, next) {
    try {

        let user = await db.User.findById(req.params.id);
        return res.status(200).json(user)

    } catch (error) {
        return next(error);
    }
};

exports.deleteUser = async function (req, res, next) {
    try {
        let foundUser = await db.User.findById(req.params.id);
        await foundUser.remove();
        return res.status(200).json(foundUser);
    } catch (error) {
        return next(error);
    }
};

exports.follow = async function (req, res, next) {
    try {
        let followed = await db.User.findByIdAndUpdate(req.params.id,
            {
                $push: {
                    'followers': req.params.currentUserName
                }
            });
        return res.status(200).json(followed);
    } catch (error) {
        return next(error);
    }

}