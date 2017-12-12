import React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import Layout from "../views/Layout.jsx";
import Invoices from "../views/Invoices.jsx";
import Customers from "../views/Customers.jsx";
import Products from "../views/Products.jsx";
import Invoice from "../views/Invoice.jsx";
import Customer from "../views/Customer.jsx";
import Product from "../views/Product.jsx";

const muiTheme = getMuiTheme({ userAgent: false });

module.exports = (
  <Router history={browserHistory}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Invoices} />
        <Route path="customers" component={Customers} />
        <Route path="customer/:id" component={Customer} />
        <Route path="products" component={Products} />
        <Route path="product/:id" component={Product} />
        <Route path="invoices" component={Invoices} />
        <Route path="invoice/:id" component={Invoices} />
      </Route>
    </MuiThemeProvider>
  </Router>
);
