const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

const db_link = process.env.MONGO_URL;

mongoose.set('strictQuery', false);
mongoose.connect(db_link)
    .then(() => {
        console.log("db connected");
    }).catch((err) => {
        console.log(err);
    })

// const datasheet = mongoose.Schema([{
//     email: { type: String, unique: true },
//     name: String,
//     chatCard: [
//         {
//             inboxType: String,
//             inboxName: String,
//             inboxMember: [],
//             messageCard: []
//         }
//     ]
// }])


const usersTable = mongoose.Schema([{
    email: { type: String, unique: true },
    name: String
}])

const inboxsTable = mongoose.Schema([{
    inboxName: String,
    inboxMember: [],
    messageCard: []
}])


const usersDataBase = mongoose.model("usersTable", usersTable);
const inboxsDataBase = mongoose.model("inboxsTable", inboxsTable);
module.exports = { usersDataBase, inboxsDataBase };



// ================messageCard============
// messageCardId: String,
// amount: String,
// message: String,
// senderName: String,
// date: String,
// splitBetween: []