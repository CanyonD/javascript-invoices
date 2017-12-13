require("babel-register")({
  presets: ["react", "es2015"]
});

var configFile = require("./config.json");
const ip = configFile.web.url,
  defaultPort = configFile.web.port,
  mongoUrl = configFile.mongo.url + ":" + configFile.mongo.port;

var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  http = require("http"),
  path = require("path"),
  cors = require("cors"),
  db = require("./db");

app.use(express.static(path.join(__dirname, "public")));
app.set("port", process.env.PORT || defaultPort);

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());

require("./routes/api.js")(app);
app.use(require("./routes/index.jsx"));

db.connect(mongoUrl, function(err) {
  if (err) {
    return console.log("Error during connect to DB", err);
  }
  app.listen(app.get("port"), function() {
    console.log("http://" + ip + ":" + app.get("port"));
  });
});
