const { inboxsDataBase } = require('../models/mongoDB');
const { usersDataBase } = require('../models/mongoDB');

module.exports.getMessages = async function getMessages(req, res) {
    try {

        const { inboxId } = req.body;

        const inboxData = await inboxsDataBase.findOne({ _id: inboxId });

        res.status(200).json({
            inboxData: inboxData
        });

    } catch (err) {
        console.log(err);
    }
}

module.exports.sentMessage = async function sentMessage(req, res) {
    try {

        const { inboxId, messageCardId, amount, message, senderName, date, splitBetween } = req.body.newMessage;

        const newMessageCard = {
            messageCardId: messageCardId,
            amount: amount,
            message: message,
            senderName: senderName,
            date: date,
            splitBetween: splitBetween
        }

        await inboxsDataBase.findOneAndUpdate(
            { _id: inboxId },
            { $addToSet: { messageCard: newMessageCard } },
            { upsert: true, new: true }
        )

        res.status(200).json({
            message: "message Sent"
        });

    } catch (err) {
        console.log(err);
    }
}

module.exports.getInboxList = async function getInboxList(req, res) {
    try {

        const { email } = req.body;
        const inboxList = await inboxsDataBase.find({ "inboxMember.email": email });

        res.status(200).json({
            inboxList: inboxList
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.createGroup = async function createGroup(req, res) {
    try {

        const { inboxName, inboxMember } = req.body;

        inboxMember.push({ name: "authUserData.name", email: "authUserData.email" });

        const newGroupData = {
            inboxName: inboxName,
            inboxMember: inboxMember,
            messageCard: []
        }

        await inboxsDataBase.collection.insertOne(newGroupData);

        res.status(200).json({
            userData: "group Created"
        });
    } catch (err) {
        console.log(err);
    }
}













module.exports.getUserList = async function getUserList(req, res) {
    try {

        const userDataList = await usersDataBase.find();

        const updatedUserDataList = userDataList.filter((user) => user.email !== "authUserData.email");

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
