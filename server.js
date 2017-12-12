require("babel-register")({
  presets: ["react", "es2015"]
});

var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  http = require("http"),
  path = require("path"),
  cors = require("cors"),
  db = require('./db');

app.use(express.static(path.join(__dirname, "public")));
app.set("port", process.env.PORT || 8000);

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());

require("./routes/api.js")(app);
app.use(require("./routes/index.jsx"));

db.connect('mongodb://localhost:27017/invoices', function(err) {
  if (err) {
		return console.log('Error during connect to DB', err);
	}
  app.listen(app.get("port"), function() {
    console.log("http://localhost:" + app.get('port'));
  });
});