const express = require('express');
const mongoose = require('mongoose');
const app = express();


//database mongo
const db = require('./config/key.js').mongoURI;

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.log(err);
    console.log('\x1b[31m\x1b[1m MongoDB Not Connected');
});




app.get('/', (req, res) => {
    res.send("Hello World");
});

const port = 4000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

module.exports = app;