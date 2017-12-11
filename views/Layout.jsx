import React from "react";
import { Link, NavLink } from "react-router";
import { connect } from "react-redux";

class Layout extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { custom } = this.props;
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>
            {custom.title}
          </title>
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div className="App">
            <nav className="navbar navbar-default navbar-static-top">
              <div className="container">
                <div className="navbar-header">
                  <Link to="/invoices" className="navbar-brand">
                    Invoice App
                  </Link>
                </div>
                <div className="navbar-collapse collapse">
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to="/customers">Customers</Link>
                    </li>
                    <li>
                      <Link to="/products">Products</Link>
                    </li>
                    <li>
                      <Link to="/invoices">Invoices</Link>
                    </li>
                  </ul>
                </div>
                {this.props.children}
              </div>
            </nav>
          </div>
          <script
            dangerouslySetInnerHTML={{
              __html: "window.PROPS=" + JSON.stringify(custom)
            }}
          />
          <script src="/bundle.js" />
        </body>
      </html>
    );
  }
}

const wrapper = connect(state => {
  return { custom: state };
});

export default wrapper(Layout);
