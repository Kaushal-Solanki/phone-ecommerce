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
    this.setState(() => {
      return { product: tempProducts };
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
        cart: [...this.state.cart, product],
      },
      () => {
        this.addTotal();
      }
    );
  };

  addTotal = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    let tampTax = subTotal * 0.1;
    const tax = parseFloat(tampTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return { cartSubTotal: subTotal, cartTax: tax, cartTotal: total };
    });
  };
  increament = (id) => {
    console.log("id", id);
    let tempCart = [...this.state.cart];
    let selectedProduct = tempCart.find((item) => item.id === id);
    let index = tempCart.indexOf(selectedProduct);
    let product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(() => {
      return { cart: [...tempCart] };
    }, this.addTotal());
  };

  decreament = (id) => {
    let tempCart = [...this.state.cart];
    let selectedProduct = tempCart.find((item) => item.id === id);
    let index = tempCart.indexOf(selectedProduct);
    let product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(() => {
        return { cart: [...tempCart] };
      }, this.addTotal());
    }
  };

  removeItem = (id) => {
    let tempCart = [...this.state.cart];
    let tempProduct = [...this.state.product];
    tempCart = tempCart.filter((item) => item.id !== id);
    const index = tempProduct.indexOf(this.getId(id));
    let removeProduct = tempProduct[index];
    removeProduct.inCart = false;
    removeProduct.count = 0;
    removeProduct.total = 0;

    this.setState(() => {
      return { cart: [...tempCart], product: [...tempProduct] };
    }, this.addTotal());
  };

  clearCart = () => {
    console.log("clear cart");
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotal();
      }
    );
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
          increament: this.increament,
          decreament: this.decreament,
          removeItem: this.removeItem,
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
