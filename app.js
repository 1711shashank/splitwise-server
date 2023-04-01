const express = require("express");
const { sentMessage, getInboxData, getUserList, createGroup, getUserData, addUserData } = require('./controller/userController');

const app = express();
var cors = require("cors");

app.use(cors({ origin: '*', optionsSuccessStatus: 200, credentials: true }));
app.options("*",cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));

app.use(express.json());



const port = 5000;
app.listen(port);


app.get("/getUserList", getUserList);
app.get("/getInboxData/:indexId", getInboxData);

app.post("/createGroup", createGroup);
app.post("/sentMessage", sentMessage);

app.get("/getUserData", getUserData);
app.post("/addUserData", addUserData);


