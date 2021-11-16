// server.js
// where your node app starts

// init project
var express = require('express');
const { engine } = require('express-handlebars');
var app = express();
require('dotenv').config()

let url = "";

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views");
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.render("layouts/main", {url});
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const formatDate = (value) => {
  let res = {};
  if (new Date(+value).getDay()) {
    res.unix = +value;
    res.utc = new Date(+value).toGMTString();
  } else if (new Date(value).getDay()) {
    res.unix = +new Date(value);
    res.utc = new Date(Date.parse(value)).toGMTString();
  } else if (!value) {
    res.unix = Date.now();
    res.utc = new Date().toGMTString();
  } else {
    res.error = "Invalid Date";
  }
  return res;
};

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const resp = formatDate(req.params.date);
  res.json(resp);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  url = listener.address();
  console.log('Your app is listening on port ' + listener.address().port);
});
