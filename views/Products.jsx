import React, { Component } from "react";
import axios from "axios";
import Grid from "./Grid.jsx";

const customButtonStyle = {
  margin: "0"
};

let model = [{ name: "Name", prop: "name" }, { name: "Price", prop: "price" }];

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products_list: []
    };
    this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleEdit(params) {
    window.location.href = "/product/" + params._id;
  }

  handleAdd(params) {
    axios
      .post("/api/products/", {
        name: "",
        price: 0
      })
      .then(results => {
        let res = results.data;
        window.location.href = "/product/" + res._id;
      });
  }

  handleRemove(params) {
    axios.delete("/api/products/" + params._id).then(results => {
      this.componentDidMount();
    });
  }

  componentDidMount() {
    axios.get("/api/products").then(results => {
      this.setState({
        products_list: results.data
      });
    });
  }

  render() {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="row">
            <div className="col-md-5">
              <h2>List of products</h2>
            </div>
            <div className="col-md-3">
              <h2>
                <button
                  className="btn btn-success"
                  style={customButtonStyle}
                  onClick={this.handleAdd}
                >
                  Add new product
                </button>
              </h2>
            </div>
          </div>
        </div>
        <Grid
          header={model}
          data={this.state.products_list}
          handleEdit={this.handleEdit}
          handleRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default Products;
