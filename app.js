const express = require("express");
const { sentMessage, getMessage, getInboxList, createGroup } = require('./controller/userController');

const app = express();
var cors = require("cors");

app.use(cors({ origin: '*', optionsSuccessStatus: 200, credentials: true }));
app.options("*",cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));

app.use(express.json());



const port = 5000;
app.listen(port);


app.get("/getMessage", getMessage);
app.get("/getInboxList", getInboxList);

app.post("/sentMessage", sentMessage);
app.post("/createGroup", createGroup);
