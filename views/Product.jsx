import React, { Component } from "react";
import axios from "axios";
import IconButton from "material-ui/IconButton";
import BackIcon from "material-ui/svg-icons/navigation/arrow-back";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const muiTheme = getMuiTheme({ userAgent: false });

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: "",
        price: 0
      }
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);

    this.id =
      this.props !== undefined &&
      this.props.params !== undefined &&
      this.props.params.id !== undefined
        ? this.props.params.id
        : 0;
  }

  componentDidMount() {
    axios.get("/api/products/" + this.id).then(results => {
      this.setState({
        product: results.data
      });
    });
  }

  handleChangePrice(event) {
    let value =
      event.target.value !== "" && !isNaN(parseInt(event.target.value, 10))
        ? parseInt(event.target.value, 10)
        : 0;
    axios
      .put("/api/products/" + this._id, {
        price: value
      })
      .then(results => {
        this.componentDidMount();
      });
  }

  handleChangeName(event) {
    axios
      .put("/api/products/" + this._id, {
        name: event.target.value
      })
      .then(results => {
        this.componentDidMount();
      });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div>
            <fieldset>
              <legend>
                <IconButton
                  className={"col-md-4 control-label "}
                  tooltip="Back to list"
                  onClick={() => {
                    window.location.href = "/products";
                  }}
                >
                  <BackIcon />
                </IconButton>
                <div className={"col-md-3 control-label"}>Edit Product</div>
              </legend>
              <form className="form-horizontal">
                <div className="form-group">
                  <label className="control-label col-sm-1">Name</label>
                  <div className="col-md-2">
                    <input
                      type="text"
                      placeholder=""
                      className={"form-control input-md input-name"}
                      value={this.state.product.name}
                      onChange={this.handleChangeName}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-1">Price</label>
                  <div className="col-md-2">
                    <input
                      type="text"
                      placeholder=""
                      className={"form-control input-md input-price"}
                      value={this.state.product.price}
                      onChange={this.handleChangePrice}
                    />
                  </div>
                </div>
              </form>
            </fieldset>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Product;
