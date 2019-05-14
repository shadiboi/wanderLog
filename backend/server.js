const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('./db/db')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));
  
  // SET UP CORS AS MIDDLEWARE, SO any client can make a request to our server
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  
  
  const corsOptions = {
    origin: 'http://localhost:3000', // when you deploy your react app, this is where you put the address,
    credentials: true, // allowing cookies to be sent with requests from the client (session cookie),
    optionsSuccessStatus: 200 // some legacy browsers IE11 choke on a 204, and options requests
  }
  
  app.use(cors(corsOptions));


  const UserController = require('./controllers/UserController');
  app.use('/users', UserController);
  
  const AuthController = require('./controllers/AuthController')
  app.use('/', AuthController);

  const EntriesController = require('./controllers/EntriesController')
  app.use('/entries', EntriesController);


  app.listen(process.env.PORT || 9000, () => {
    console.log('listening on port 9000');
  });
  

