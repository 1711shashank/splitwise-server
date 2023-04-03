const express = require("express");

const { authenticateToken } = require("./middleware/middleware");
const { oauth, validateCallback } = require("./controller/authController");
const { sentMessage, getMessages, getInboxList, createGroup, getUserList } = require('./controller/userController');

const app = express();
var cors = require("cors");

app.use(cors({ origin: '*', optionsSuccessStatus: 200, credentials: true }));
app.options("*",cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));

app.use(express.json());


const port = 5000;
app.listen(port);



app.get("/oauth", oauth);
app.get("/validate-callback", validateCallback);


app.post("/getMessages", authenticateToken, getMessages);
app.post("/getInboxList", authenticateToken, getInboxList);

app.post("/sentMessage", authenticateToken, sentMessage);
app.post("/createGroup", authenticateToken, createGroup);
app.get("/getUserList", authenticateToken, getUserList);


