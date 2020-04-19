import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/cart/Cart";
import Default from "./Components/PageNotFound";
import Modal from "./Components/Modal";
import { ProductConsumer } from ".//Components/Context";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/details" component={ProductDetails} />
          <Route exact path="/cart" component={Cart} />
          <Route exact component={Default} />
        </Switch>
        <ProductConsumer>
          {(value) => {
            const { modalOpen } = value;
            if (modalOpen) {
              return <Modal />;
            }
          }}
        </ProductConsumer>
      </Fragment>
    );
  }
}

export default App;
