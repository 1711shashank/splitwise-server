const { db } = require('../models/mongoDB');

module.exports.createGroup = async function createGroup(req, res) {
    try {

        const { _id, groupName, inboxMember} = req.body;
        
        const myData = await db.findOne({ _id: req.body._id });
        
        // const inboxMember = req.body.inboxMember;
        inboxMember.push({ name : myData.name, email : myData.email });

        const newEntry = {
            inboxType : 'GROUP',
            inboxName : groupName,
            inboxMember : inboxMember,
            messageCard : []
        }

        await db.findOneAndUpdate(
            { _id: req.body._id }, // filter
            { $addToSet: { 'chatCard' : newEntry }}, // update
            { upsert: true, new: true } // conduction
        );
        
        res.status(200).json({
            userData : "group Created"
        });
    } catch (err) {
        console.log(err);
    }
}

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

module.exports.getUserList = async function getUserList(req, res) {
    try {

        const userDataList = await db.find();

        const updatedUserDataList = userDataList.filter( (user) => user.email !== 'groupInd@gmail.com');

        let userList = updatedUserDataList.map(({ name, email }) => ({ name, email }));

        res.status(200).json({
            userList : userList
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
