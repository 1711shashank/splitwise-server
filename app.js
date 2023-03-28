const express = require("express");
const { getUserList, createGroup, getUserData, addUserData } = require('./controller/userController');

const app = express();
var cors = require("cors");

app.use(cors({ origin: '*', optionsSuccessStatus: 200, credentials: true }));
app.options("*",cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));

app.use(express.json());



const port = 5000;
app.listen(port);


app.get("/getUserList", getUserList);

app.post("/createGroup", createGroup);

app.get("/getUserData", getUserData);
app.post("/addUserData", addUserData);


