const jwt = require('jsonwebtoken');
const { usersDataBase } = require('../models/mongoDB');

exports.authenticateToken = async(req, res, next) => {

    const { authToken } = req.body;

    if (!authToken) {
        res.status(405).json({
            title: "Invalid Request",
            message: "Please Check the Request Header Token Mismatch"
        });
        return
    }

    let result;

    try {
        result = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    } catch (e) {
        res.status(422).json({
            status: 'FAILURE',
            message: 'Token Validation Failed! Invalid Token',
        })
    }

    if (!result) {
        res.status(405).json({
            title: "Token Mismatch",
            message: "Please Check the Request Header Token Mismatch"
        });
    }

    let userData = await usersDataBase.findOne({ email: result.payload });
    req.headers.email=userData.email;

    if (!userData) {
        res.status(403).json({
            title: "Invalid Request",
            message: "user Data does Not Exists in the database"
        });
    }
    if (userData.jwtToken != authToken) {
        res.status(405).json({
            title: "Token Mismatch in Database",
            message: "Please Check the Request Header Token Mismatch"
        });
    }
    next();
}