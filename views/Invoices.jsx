import React, { Component } from "react";
import axios from "axios";
import Grid from "../views/Grid.jsx";

const customButtonStyle = {
  margin: "0"
};

let model = [
  { name: "Customer", prop: "customer" },
  { name: "Discount", prop: "discount" },
  { name: "Total", prop: "total" }
];

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [
        {
          discount: 0,
          total: 0,
          items: []
        }
      ]
    };

    axios.get("/api/customers").then(results => {
      this.setState({
        customers: results.data
      });
    });

    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleAddInvoice = this.handleAddInvoice.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleEdit(params) {
    window.location.href = "/invoice/" + params._id;
  }

  handleRemove(params) {
    axios.delete("/api/invoices/" + params._id).then(results => {
      this.componentDidMount();
    });
  }

  componentDidMount() {
    axios.get("/api/invoices").then(results => {
      let res = results.data;
      if (res.length === 0)
        this.setState({
          invoices: []
        });
      results.data.map((x, y) => {
        if (x.customer_id !== 0 && x.customer_id !== null) {
          res[y].customer = this.state.customers.find(
            p => p._id === x.customer_id
          ).name;
          this.setState({
            invoices: res
          });
        } else {
          res[y].customer = "";
          this.setState({
            invoices: res
          });
        }
        return x;
      });
    });
  }

  handleAddInvoice(params) {
    axios
      .post("/api/invoices/", {
        customer_id: 0,
        total: 0,
        discount: 0
      })
      .then(results => {
        let res = results.data;
        window.location.href = "/invoice/" + res._id;
      });
  }

  render() {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="row">
            <div className="col-md-5">
              <h2>List of invoices</h2>
            </div>
            <div className="col-md-3">
              <h2>
                <button
                  className="btn btn-success"
                  style={customButtonStyle}
                  onClick={this.handleAddInvoice}
                >
                  Add new invoice
                </button>
              </h2>
            </div>
          </div>
        </div>
        <Grid
          {...this.props}
          header={model}
          data={this.state.invoices}
          handleEdit={this.handleEdit}
          handleRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default Invoices;
