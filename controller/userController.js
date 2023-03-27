const { db } = require('../models/mongoDB');

module.exports.getUserData = async function getUserData(req, res) {
    try {

        // const { email } = req.body;
        // console.log(email);

        let userData = await db.find();

        res.status(200).json({
            userData : userData[1]
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.addUserData = async function addUserData(req, res) {
    try {
        const { email, name, chatCard } = req.body;

        await db.collection.insertOne({
            email: email, 
            name: name, 
            chatCard: chatCard 
        } );

        res.status(200).json({
            Message : "User data added successfully"
        });

    } catch (err) {
        console.log(err);
    }
}
