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
        res.status(405).json({
            status: 'FAILURE',
            message: 'getInboxList'
        })
    }
}

module.exports.sentMessage = async function sentMessage(req, res) {
    try {

        const { inboxId, messageCardId, amount, message, date, splitBetween } = req.body.newMessage;

        const email = req.headers.email;
        
        const userData = await usersDataBase.findOne({ email: email }); 

        const newMessageCard = {
            messageCardId: messageCardId,
            amount: amount,
            message: message,
            senderName: userData.name,
            senderEmail: userData.email,
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
        res.status(405).json({
            status: 'FAILURE',
            message: 'getInboxList'
        })
    }
}

module.exports.getInboxList = async function getInboxList(req, res) {
    try {

        const email = req.headers.email;
        const inboxList = await inboxsDataBase.find({ "inboxMember.email": email });

        res.status(200).json({
            inboxList: inboxList
        });
    } catch (err) {
        res.status(405).json({
            status: 'FAILURE',
            message: 'getInboxList'
        })
    }
}


module.exports.createGroup = async function createGroup(req, res) {
    try {

        const { inboxName, inboxMember } = req.body;
        const email = req.headers.email;

        const userData = await usersDataBase.findOne({ email: email });

        inboxMember.push({ name: userData.name, email: email });

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
        res.status(405).json({
            status: 'FAILURE',
            message: 'getInboxList'
        })
    }
}

module.exports.getUserList = async function getUserList(req, res) {
    try {

        const email = req.headers.email;
        
        const userDataList = await usersDataBase.find();

        const updatedUserDataList = userDataList.filter((user) => user.email !== email);

        let userList = updatedUserDataList.map(({ name, email }) => ({ name, email }));

        res.status(200).json({
            userList: userList
        });

    } catch (err) {
        res.status(405).json({
            status: 'FAILURE',
            message: 'getInboxList'
        })
    }
}

