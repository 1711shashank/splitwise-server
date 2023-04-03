const axios = require("axios");
const qs = require("qs");
const jwt = require('jsonwebtoken');
const { usersDataBase } = require('../models/mongoDB');



const createJwtToken = async (userInfo) => {
    const jwtToken = jwt.sign({ payload: userInfo.data.email }, process.env.JWT_SECRET_KEY, { expiresIn: '12h' });

    await usersDataBase.findOneAndUpdate(
        {},
        { jwtToken: jwtToken, email: userInfo.data.email, name: userInfo.data.name },
        { upsert: true, new: true }
    )

    return jwtToken;
}

exports.validateCallback = async (req, res) => {
    try {
        const { code } = req.query;

        const googleRedirectUrl = 'http://localhost:5000/validate-callback';

        const data = {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_SECRET_KEY,
            code: code,
            grant_type: "authorization_code",
            redirect_uri: googleRedirectUrl,
        };
        console.dir({ data }, { depth: null });
        let config = {
            method: "post",
            url: "https://oauth2.googleapis.com/token",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: qs.stringify(data),
        };

        console.dir({ config }, { depth: null });

        const response = await axios(config);

        const id_token = response.data.id_token;

        let configs = {
            method: "get",
            url: `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`,
            headers: {},
        };

        const userInfo = await axios(configs);

        authToken = await createJwtToken(userInfo);
        console.log(authToken);

        return res.redirect(`http://localhost:3000/?authToken=${authToken}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong 123" });
    }
};

exports.oauth = async (req, res) => {
    console.log('auth');
    const options = {
        redirect_uri: `http://localhost:5000/validate-callback`,
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "email",
            "profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "openid",
        ].join(" "),
    };
    const qs = new URLSearchParams(options);
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${qs.toString()}`;
    return res.redirect(url);
};