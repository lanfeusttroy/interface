const express = require('express');
const cors = require('cors');

const jwt = require('jsonwebtoken');  
const expressJwt = require('express-jwt');


const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();


//database mongo
const db = require('./config/mongodb.js').mongoURI;

//tokenkey 
const tokenkey =  require('./config/key.js').tokenKey;

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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressJwt({ secret: tokenkey }).unless(
                                          { 
                                            path: [ 
                                              '/user/register',  
                                              '/navire/first' 
                                            ]
                                          }
                                      )); 


//routes
const naviresRouter = require('./routes/navire.js');
const usersRouter = require('./routes/user.js');

app.use('/navire', naviresRouter);
app.use('/user', usersRouter);


const port = 4000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

module.exports = app;