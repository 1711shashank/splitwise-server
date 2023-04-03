const express = require("express");
const { oauth, validateCallback } = require("./controller/authController");
const { sentMessage, getMessages, getInboxList, createGroup, getUserList } = require('./controller/userController');

const app = express();
var cors = require("cors");

app.use(cors({ origin: '*', optionsSuccessStatus: 200, credentials: true }));
app.options("*",cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));

app.use(express.json());


const port = 5000;
app.listen(port);


app.post("/getMessages", getMessages);
app.post("/getInboxList", getInboxList);

app.post("/sentMessage", sentMessage);
app.post("/createGroup", createGroup);
app.get("/getUserList", getUserList);


app.get("/oauth", oauth);
app.get("/validate-callback", validateCallback);