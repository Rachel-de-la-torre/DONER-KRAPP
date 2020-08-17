require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/kebabDb", {
    useNewUrlParser: true
  })

  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

// Express Session setup
const sessionKebab = require('express-session');
const MongoStoreKebab = require('connect-mongo')(sessionKebab);

const sessionUser = require('express-session');
const MongoStoreUser = require('connect-mongo')(sessionUser);

// Import of the model Kebab from './models/...'
const Kebab = require('./models/kebab');
const User = require('./models/user');

app.use(
  sessionKebab({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    },
    // session is uninitialized when it is new but not modified - default is false
    saveUninitialized: false,
    //Forces the session to be saved back to the session store, 
    // even if the session was never modified during the request.
    resave: true,
    store: new MongoStoreKebab({
      //When the session cookie has an expiration date, connect-mongo will use it.
      // Otherwise, it will create a new one, using ttl option - here ttl is one day.
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 1000
    })
  }),
  sessionUser({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    },
    // session is uninitialized when it is new but not modified - default is false
    saveUninitialized: false,
    //Forces the session to be saved back to the session store, 
    // even if the session was never modified during the request.
    resave: true,
    store: new MongoStoreUser({
      //When the session cookie has an expiration date, connect-mongo will use it.
      // Otherwise, it will create a new one, using ttl option - here ttl is one day.
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 1000
    })
  })
);

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
//app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "";

const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

const newKebab = require("./routes/kebabRoute");
app.use("/", newKebab);

module.exports = app