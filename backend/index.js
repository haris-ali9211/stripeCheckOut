const express = require('express')
const app = express()
const port = 5000;
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const stripe = require("./routes/stripe")
var cors = require('cors');

app.use(cors())


dotenv.config();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log("Connection not successful", err);
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/checkout/', stripe);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})