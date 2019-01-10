const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const issues = require('./routes/issue');

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/issues', {useNewUrlParser: true})
    .then(() => console.log("mongoDB connected"))
    .catch(err =>console.log(`mongoDB could not connected`));

app.use('/api/issues', issues);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening at port ${port}`);
});