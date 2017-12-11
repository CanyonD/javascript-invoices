require("babel-register")({
  presets: ["react", "es2015"]
});

var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  http = require("http"),
  path = require("path");
cors = require("cors");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());

require("./routes/api.js")(app);
app.use(require("./routes/index.jsx"));

var PORT = 8000;
app.listen(PORT, function() {
  console.log("http://localhost:" + PORT);
});
