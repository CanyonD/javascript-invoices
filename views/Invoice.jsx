import React, { Component } from "react";
import axios from "axios";
import IconButton from "material-ui/IconButton";
import BackIcon from "material-ui/svg-icons/navigation/arrow-back";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const muiTheme = getMuiTheme({ userAgent: false });

const customButtonStyle = {
  margin: "0",
  width: "110px"
};

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: {
        discount: 0,
        total: 0,
        items: []
      },
      products: [],
      customers: []
    };

    axios.get("/api/products").then(results => {
      this.setState({
        products: results.data
      });
    });

    axios.get("/api/customers").then(results => {
      this.setState({
        customers: results.data
      });
    });

    this.render = this.render.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChangeDiscount = this.handleChangeDiscount.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleChangeProduct = this.handleChangeProduct.bind(this);
    this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);

    this.id =
      this.props !== undefined &&
      this.props.params !== undefined &&
      this.props.params.id !== undefined
        ? this.props.params.id
        : 0;
  }

  componentDidMount(callback) {
    axios.get("/api/invoices/" + this.id + "/items/").then(results => {
      let res = results.data;
      results.data.map((x, y) => {
        if (x.product_id !== 0) {
          axios.get("/api/products/" + x.product_id).then(results => {
            if (results.data === null) res[y].items = [];
            else {
              res[y].price = results.data.price;
              res[y].product_id = results.data._id;
            }
            this.setState({
              invoice: Object.assign(this.state.invoice, { items: res })
            });
            if (callback === true) this.calculateTotal();
          });
        } else {
          res[y].price = 0;
          this.setState({
            invoice: Object.assign(this.state.invoice, { items: res })
          });
        }
        return x;
      });
    });
  }

  handleChangeDiscount(event) {
    let value =
      event.target.value !== "" && !isNaN(parseInt(event.target.value, 10))
        ? parseInt(event.target.value, 10)
        : 0;
    let total = 0;
    this.state.invoice.items.map((x, y) => {
      // console.log("calculate", x.price, x.quantity);
      if (x.price === undefined) x.price = 0;
      total += x.price * x.quantity;
      return x;
    });
    let calc_total = total - total * value / 100;

    axios
      .put("/api/invoices/" + this.id, {
        discount: value,
        total: calc_total
      })
      .then(results => {
        this.componentWillMount();
      });
  }

  handleRemoveClick(event) {
    console.log(event._id);
    axios
      .delete("/api/invoices/" + this.id + "/items/" + event._id)
      .then(results => {
        this.componentDidMount();
      });
  }

  handleChangeProduct(event, row, id) {
    let value = event.target.value;
    axios
      .put("/api/invoices/" + this.id + "/items/" + id, {
        product_id: value
      })
      .then(results => {
        this.componentDidMount(true);
        this.componentWillMount();
      });
  }

  handleChangeCustomer(event) {
    axios
      .put("/api/invoices/" + this.id, {
        customer_id: event.target.value
      })
      .then(results => {
        this.componentWillMount();
      });
  }

  calculateTotal() {
    let total = 0;
    this.state.invoice.items.map((x, y) => {
      if (x.price === undefined) x.price = 0;
      total += x.price * x.quantity;
      return x;
    });
    total = total - total * this.state.invoice.discount / 100;
    axios
      .put("/api/invoices/" + this.id, {
        total: total
      })
      .then(results => {
        this.componentWillMount();
      });
  }

  handleAddClick() {
    axios
      .post("/api/invoices/" + this.state.invoice._id + "/items/", {
        invoice_id: this.state.invoice._id,
        product_id: 0,
        quantity: 0
      })
      .then(results => {
        this.componentWillMount();
      });
  }

  componentWillMount() {
    if (this.id !== 0) {
      axios.get("/api/invoices/" + this.id).then(results => {
        this.setState({
          invoice: Object.assign(results.data, {
            items: this.state.invoice.items
          })
        });
      });
    }
  }

  handleChangeQuantity(event, row, id) {
    let value =
      event.target.value !== "" && !isNaN(parseInt(event.target.value, 10))
        ? parseInt(event.target.value, 10)
        : 0;
    axios
      .put("/api/invoices/" + this.id + "/items/" + id, {
        quantity: value
      })
      .then(results => {
        this.componentDidMount();
        const tmp_invoice = this.state.invoice;
        tmp_invoice.items[row].quantity = value;
        this.setState({
          invoice: tmp_invoice
        });
        this.calculateTotal();
      });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div>
            <form className="form-horizontal">
              <fieldset>
                <legend>
                  <IconButton
                    className={"col-md-4 control-label "}
                    tooltip="Back to list"
                    onClick={() => {
                      window.location.href = "/invoices";
                    }}
                  >
                    <BackIcon />
                  </IconButton>
                  <div className={"col-md-2 control-label"}>Edit Invoice</div>
                </legend>
                <div className="form-group">
                  <label className="control-label col-sm-2">Customer</label>

                  <div className="col-md-3">
                    <select
                      className="form-control"
                      id="sel1"
                      value={this.state.invoice.customer_id}
                      onChange={this.handleChangeCustomer}
                    >
                      <option key={`ddm-i-${0}`} value={0}>
                        Please select customer
                      </option>
                      {this.state.customers.map((x, y) =>
                        <option key={`ddm-i-${x._id}`} value={x._id}>
                          {x.name}
                        </option>
                      )}
                    </select>
                  </div>
                  <label className="control-label col-sm-1">Discount</label>
                  <div className="col-md-2">
                    <input
                      type="number"
                      placeholder=""
                      min = '0'
                      max = '100'
                      className={"form-control input-md"}
                      value={this.state.invoice.discount}
                      onChange={this.handleChangeDiscount}
                    />
                  </div>
                  <label className="control-label col-sm-2">Total</label>
                  <label className="control-label col-sm-2">
                    <div className="col-md-1 big-size">
                      {Math.round(parseFloat(this.state.invoice.total) * 100) /
                        100}
                    </div>
                  </label>
                </div>
              </fieldset>
              <div className="col-md-12">
                <table
                  className={"table table-condensed table-hover table-striped"}
                >
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Quantity</th>
                      <th style={{ width: "100px" }}>
                        <section>
                          <button
                            className="btn btn-success"
                            style={customButtonStyle}
                            key={"addItem"}
                            onClick={() => this.handleAddClick()}
                          >
                            Add product
                          </button>
                        </section>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.invoice.items.map((y, k) =>
                      <tr key={k}>
                        <td>
                          <select
                            className="form-control"
                            id={`sel-${y._id}`}
                            value={y.product_id}
                            onChange={event =>
                              this.handleChangeProduct(event, k, y._id)}
                          >
                            <option key={`ddm-i-${0}`} value={0}>
                              Please select product
                            </option>
                            {this.state.products.map((x, y) =>
                              <option key={`ddm-i-${x._id}`} value={x._id}>
                                {x.name}
                              </option>
                            )}
                          </select>
                        </td>
                        <td className="text-center">
                          {y.price}
                        </td>
                        <td className="text-center">
                          <input
                            type="text"
                            className={"form-control input-sm"}
                            value={y.quantity}
                            onChange={event =>
                              this.handleChangeQuantity(event, k, y._id)}
                          />
                        </td>
                        <th>
                          <button
                            className="btn btn-danger"
                            style={customButtonStyle}
                            onClick={() => this.handleRemoveClick(y)}
                          >
                            Remove
                          </button>
                        </th>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Invoice;
