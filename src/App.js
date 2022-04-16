import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/bootstrap.css";
import "./css/responsive.css";
import "./css/responsive.css.map";
import "./css/ui.css";
import "./css/ui.css.map";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Store from "./components/Store";
import Detail from "./components/Detail";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Logout from "./components/Logout";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Home from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartPage from "./components/CartPage";
import "react-toastify/dist/ReactToastify.css";
import URLS from "./components/Urls";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "./axios";
import addProducts from "./components/addProducts";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      clickAddCart: false,
      searchTerm: "",
      searchResults: [],
    };
    this.HandleAddCart = this.HandleAddCart.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.notifySuccess = this.notifySuccess.bind(this);
    this.notifyFail = this.notifyFail.bind(this);
    this.capFirst = this.capFirst.bind(this);
    this.handleOrderDelete = this.handleOrderDelete.bind(this);
  }

  notifyFail(message) {
    toast.error(message);
  }

  notifySuccess(message) {
    toast.success(message);
  }

  HandleAddCart() {
    this.setState({ clickAddCart: !this.state.clickAddCart });
  }

  handleOrderDelete = () => {
    axiosInstance.delete(`orders/delete_order/`);
    window.location.reload(false);
  };

  // Been added remove if nessecary From here
  componentDidMount() {
    axios
      .get(`${URLS.all_products}`)
      .then((res) => this.setState({ products: res.data }));
  }

  searchHandler = (searchTerm) => {
    console.log(searchTerm);
    this.setState({ searchTerm: searchTerm });
    if (searchTerm !== "") {
      const newProductList = this.state.products.filter((product) => {
        return Object.values(product)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      this.setState({ searchResults: newProductList });
    } else {
      this.setState({ searchResults: this.state.products });
    }
  };

  // Until here
  capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <>
        <Router>
          <Nav
            clickAddCart={this.state.clickAddCart}
            term={this.state.searchTerm}
            searchKeyWord={this.searchHandler}
            products={
              this.state.searchTerm < 1
                ? this.state.products
                : this.state.searchResults
            }
          />
          <Routes>
            <Route
              exact
              path='/'
              element={
                <Home
                  term={this.state.searchTerm}
                  searchKeyWord={this.searchHandler}
                  products={
                    this.state.searchTerm < 1
                      ? this.state.products
                      : this.state.searchResults
                  }
                />
              }
            />
            <Route
              path='/store'
              element={
                <Store
                  products={
                    this.state.searchTerm < 1
                      ? this.state.products
                      : this.state.searchResults
                  }
                />
              }
            />

            <Route
              path='/product-detail/:id'
              element={
                <Detail
                  capFirst={this.capFirst}
                  HandleAddCart={this.HandleAddCart}
                  notifyFail={this.notifyFail}
                  notifySuccess={this.notifySuccess}
                />
              }
            />

            <Route
              path='/cart'
              element={
                <CartPage
                  HandleAddCart={this.HandleAddCart}
                  capFirst={this.capFirst}
                />
              }
            />

            <Route path='/user/create' element={<Register />} />
            <Route
              path='/sign-in'
              element={
                <SignIn
                  HandleAddCart={this.HandleAddCart}
                  notifyFail={this.notifyFail}
                  notifySuccess={this.notifySuccess}
                />
              }
            />
            <Route
              path='/logout'
              element={<Logout notifySuccess={this.notifySuccess} />}
            />

            <Route
              path='/checkout'
              element={<Checkout handleOrderDelete={this.handleOrderDelete} />}
            />
            <Route
              path='/payment'
              element={
                <Payment
                  clickAddCart={this.state.clickAddCart}
                  handleOrderDelete={this.handleOrderDelete}
                />
              }
            />

            <Route path='/add-product' element={<addProducts />} />
          </Routes>
          <Footer />
        </Router>
      </>
    );
  }
}
