const express = require('express')
const session = require('express-session')
const app = express()
const port = 3333

const cors = require('cors')

const MongoStore = require('connect-mongo');
const sessionStore = MongoStore.create({ mongoUrl: 'mongodb+srv://jezol20147:Ku8qf6BzQcEnb9Wl@cluster0.1giosaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'})

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(jsonParser)
app.use(express.urlencoded({extended: true}))


app.use(session({
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 600000,
  },
  store:sessionStore
}));

app.post('/', (req, res) => {
  if(req.session.value)
    {
      req.session.value = req.session.value + 1
    }
    else
    {
      req.session.value = 1;
    }
  
  console.log(req.session)
  res.send(`${req.session.value}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})