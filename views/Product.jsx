import React, { Component } from "react";
import axios from "axios";
import IconButton from "material-ui/IconButton";
import BackIcon from "material-ui/svg-icons/navigation/arrow-back";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: 0,
        price: 0
      }
    };
    // this.render = this.render.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);

    this.id =
      this.props !== undefined &&
      this.props.match !== undefined &&
      this.props.match.params !== undefined &&
      this.props.match.params.id !== undefined
        ? parseInt(this.props.match.params.id, 10)
        : 0;
  }

  componentDidMount() {
    axios
      .get("http://localhost:8800/api/products/" + this.props.match.params.id)
      .then(results => {
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
      .put("http://localhost:8800/api/products/" + this.id, {
        price: value
      })
      .then(results => {
        this.componentDidMount();
      });
  }

  handleChangeName(event) {
    axios
      .put("http://localhost:8800/api/products/" + this.id, {
        name: event.target.value
      })
      .then(results => {
        this.componentDidMount();
      });
  }

  render() {
    return (
      <div>
        <div>
          <fieldset>
            <legend>
              <IconButton
                className={"col-md-4 control-label "}
                tooltip="Back to list"
                onClick={() => {
                  this.props.history.push("/products");
                }}
              >
                <BackIcon />
              </IconButton>
              <div className={"col-md-3 control-label"}>
                Edit Product # {this.props.match.params.id}
              </div>
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
    );
  }
}

export default Product;
