import React, { Component, createContext } from "react";
import { storeProducts, detailProduct } from "../data";

const ProductContext = createContext();

class ProductProvider extends Component {
  state = {
    product: [],
    detailProduct: detailProduct,
    cart: [],
    modalProduct: detailProduct,
    modalOpen: false,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      let singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState({
      product: tempProducts,
    });
  };

  getId = (id) => {
    let product = this.state.product.find((item) => item.id === id);
    return product;
  };
  openModal = (id) => {
    const product = this.getId(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return {
        modalOpen: false,
      };
    });
  };
  handleDetail = (id) => {
    let detailProduct = this.getId(id);
    this.setState({
      detailProduct,
    });
  };

  addToCart = (id) => {
    let tempProduct = [...this.state.product];
    let index = tempProduct.indexOf(this.getId(id));
    let product = tempProduct[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      {
        product: tempProduct,
        cart: product,
      },
      () => console.log("new cart", this.state)
    );
  };
  increament = (id) => {
    console.log("Increament");
  };

  decreament = (id) => {
    console.log("Decreamnet");
  };

  removeItem = (id) => {
    console.log("Remove Item");
  };

  clearCart = () => {
    console.log("Cl;ear Cart");
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increamnet: this.increament,
          decreament: this.decreament,
          remove: this.removeItem,
          clearItem: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
