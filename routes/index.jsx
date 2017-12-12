var router = require("express").Router();
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var ReactRouter = require("react-router");
var Redux = require("redux");
var Provider = require("react-redux").Provider;

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

function reducer(state) {
  return state;
}

const muiTheme = getMuiTheme({ userAgent: false });

router.get("*", function(request, response) {
  var initialState = { title: "Javascript Invoices" };
  var store = Redux.createStore(reducer, initialState);

  ReactRouter.match(
    {
      routes: require("./routes.jsx"),
      location: request.url
    },
    function(error, redirectLocation, renderProps) {
      if (renderProps) {
        var html = ReactDOMServer.renderToString(
          <Provider store={store}>
            <MuiThemeProvider muiTheme={muiTheme}>
              <ReactRouter.RouterContext {...renderProps} />
            </MuiThemeProvider>
          </Provider>
        );
        response.send(html);
      } else {
        response.status(404).send("Not Found");
      }
    }
  );
});

module.exports = router;
