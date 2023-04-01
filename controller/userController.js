const { db } = require('../models/mongoDB');

module.exports.sentMessage = async function sentMessage(req, res) {
    try {

        const { userId, inboxId, messageCardId, amount, date, message, messageStatus } = req.body.newEntry;

        const myData = await db.findOne({ _id: userId });

        const newMessageEntry = {
            messageCardId: messageCardId,
            senderName: myData.name,
            amount: amount,
            date: date,
            message: message,
            messageStatus: messageStatus
        }

        await db.findOneAndUpdate(
            { _id: userId, "chatCard._id": inboxId },
            { $addToSet: { 'chatCard.$.messageCard': newMessageEntry } },
            { upsert: true, new: true }
        );

        console.log(await db.findOne({ _id: userId }));

        res.status(200).json({
            userData: "message Sent"
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports.createGroup = async function createGroup(req, res) {
    try {

        const { _id, groupName, inboxMember } = req.body;

        const myData = await db.findOne({ _id: req.body._id });

        // const inboxMember = req.body.inboxMember;
        inboxMember.push({ name: myData.name, email: myData.email });

        const newEntry = {
            inboxType: 'GROUP',
            inboxName: groupName,
            inboxMember: inboxMember,
            messageCard: []
        }

        await db.findOneAndUpdate(
            { _id: req.body._id }, // filter
            { $addToSet: { 'chatCard': newEntry } }, // update
            { upsert: true, new: true } // conduction
        );

        res.status(200).json({
            userData: "group Created"
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.getInboxData = async function getInboxData(req, res) {
    try {

        const inboxId = req.params.indexId;

        console.log(inboxId);

        let inboxData = await db.findOne({ _id: '64230141bdb38307719b55c4', 'chatCard._id': inboxId }, { 'chatCard.$': 1 });

        res.status(200).json({
            userData: inboxData
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports.getUserData = async function getUserData(req, res) {
    try {

        let userData = await db.find();

        res.status(200).json({
            userData: userData[0]
        });
    } catch (err) {
        console.log(err);
    }
}



module.exports.getUserList = async function getUserList(req, res) {
    try {

        const userDataList = await db.find();

        const updatedUserDataList = userDataList.filter((user) => user.email !== 'groupInd@gmail.com');

        let userList = updatedUserDataList.map(({ name, email }) => ({ name, email }));

        res.status(200).json({
            userList: userList
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
        });

        res.status(200).json({
            Message: "User data added successfully"
        });

    } catch (err) {
        console.log(err);
    }
}
